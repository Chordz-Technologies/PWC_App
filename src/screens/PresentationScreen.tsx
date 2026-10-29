import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/PresentationScreenStyle';
import SafeAreaWrapper from './SafeAreaWrapper';
import { getAllChapters, addPresentationRequest, getPresentationNotifications, getPresentationDetails, } from '../services/authApi';

type Chapter = {
    id: number;
    chapter_name?: string;
    name?: string;
    title?: string;
};

type Presentation = {
    id: number;
    date: string;
    time: string;
    member: number;
    member_name?: string;
    topic: string;
    chapter: number;
    comment?: string | null;
    status: 'pending' | 'approved' | 'rejected' | string;
};

type PresentationNotification = {
    id: number;
    recipient?: number;
    presentation?: number;
    presentation_topic?: string;
    presentation_status?: string;
    title?: string;
    message?: string;
    is_read?: boolean;
    created_at?: string;
};

const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') {
        return error;
    }

    if (error?.message) {
        return error.message;
    }

    if (error?.detail) {
        return error.detail;
    }

    if (error?.error) {
        return error.error;
    }
    return 'Something went wrong. Please try again.';
};

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const formatDisplayDate = (dateString: string): string => {
    if (!dateString) {
        return 'Date not available';
    }

    const parsedDate = new Date(`${dateString.substring(0, 10)}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
        return dateString;
    }

    return parsedDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const formatDisplayTime = (timeString: string): string => {
    if (!timeString) {
        return 'Time not available';
    }

    const parts = timeString.split(':');
    const hours = Number(parts[0]);
    const minutes = parts[1];

    if (Number.isNaN(hours) || !minutes) {
        return timeString;
    }

    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes} ${period}`;
};

const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return '#2E7D32';

        case 'rejected':
            return '#D32F2F';

        case 'pending':
        default:
            return '#F9A825';
    }
};

const getStatusIcon = (status: string): string => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return 'checkmark-circle';

        case 'rejected':
            return 'close-circle';

        case 'pending':
        default:
            return 'time';
    }
};

const PresentationScreen = ({ navigation }: any) => {
    const [memberId, setMemberId] = useState<number | null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
    const [topic, setTopic] = useState('');
    const [comment, setComment] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [presentation, setPresentation] = useState<Presentation | null>(null);
    const [notifications, setNotifications] = useState<PresentationNotification[]>([]);
    const selectedChapter = chapters.find(chapter => Number(chapter.id) === Number(selectedChapterId),);
    const selectedChapterName =
        selectedChapter?.chapter_name ||
        selectedChapter?.name ||
        selectedChapter?.title ||
        'Selected chapter';

    const loadMemberId = useCallback(async (): Promise<number | null> => {
        try {
            const storedMemberId = await AsyncStorage.getItem('userId');

            if (
                !storedMemberId ||
                !Number.isFinite(Number(storedMemberId))
            ) {
                return null;
            }

            const parsedId = Number(storedMemberId);
            setMemberId(parsedId);

            return parsedId;
        } catch (error) {
            console.error('Error loading member ID:', error);
            return null;
        }
    }, []);

    // --------------------------------------------------
    // Fetch all chapters for dropdown
    // --------------------------------------------------
    const fetchChapters = useCallback(async () => {
        try {
            const response: any = await getAllChapters();

            const possibleLists = [
                response?.all_chapters,
            ];

            const chapterList = possibleLists.find(Array.isArray) || [];

            const validChapters: Chapter[] = chapterList
                .filter((item: any) => item?.id != null)
                .map((item: any) => ({
                    id: Number(item.id),
                    chapter_name: item.chapterName,
                    name: item.name,
                    title: item.title,
                }));

            setChapters(validChapters);
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    }, []);

    // --------------------------------------------------
    // Fetch presentation details using member ID
    // GET /presentation/presentationDetails/{id}/
    // --------------------------------------------------
    const fetchPresentationDetails = useCallback(
        async (currentMemberId: number, showError = true) => {
            setDetailsLoading(true);

            try {
                const response: any =
                    await getPresentationDetails(currentMemberId);

                const details: Presentation | undefined =
                    response?.presentation_details ??
                    response?.data?.presentation_details ??
                    response?.data?.data?.presentation_details;

                if (details) {
                    setPresentation(details);
                } else {
                    setPresentation(null);

                    if (showError) {
                        Alert.alert(
                            'No presentation details',
                            response?.message ||
                            'No presentation details were returned by the server.',
                        );
                    }
                }
            } catch (error: any) {
                console.error('Error fetching presentation details:', error);

                if (showError) {
                    Alert.alert(
                        'Unable to load presentation',
                        getErrorMessage(error),
                    );
                }
            } finally {
                setDetailsLoading(false);
            }
        },
        [],
    );

    // --------------------------------------------------
    // Fetch notifications
    // --------------------------------------------------
    const fetchNotifications = useCallback(
        async (currentMemberId: number) => {
            try {
                const response: any = await getPresentationNotifications(currentMemberId);

                const possibleLists = [
                    response?.notifications,
                ];

                const notificationList =
                    possibleLists.find(Array.isArray) || [];

                const memberNotifications = notificationList.filter(
                    (item: PresentationNotification) =>
                        item.recipient == null ||
                        Number(item.recipient) === Number(currentMemberId),
                );

                setNotifications(memberNotifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setNotifications([]);
            }
        },
        [],
    );

    // --------------------------------------------------
    // Initial screen loading
    // --------------------------------------------------
    const loadScreenData = useCallback(async () => {
        setLoading(true);

        try {
            const currentMemberId = await loadMemberId();

            await fetchChapters();

            if (currentMemberId !== null) {
                await Promise.all([
                    fetchPresentationDetails(currentMemberId, false),
                    fetchNotifications(currentMemberId),
                ]);
            } else {
                Alert.alert(
                    'Login required',
                    'Unable to find your member ID. Please log in again.',
                );
            }
        } finally {
            setLoading(false);
        }
    }, [
        loadMemberId,
        fetchChapters,
        fetchPresentationDetails,
        fetchNotifications,
    ]);

    useEffect(() => {
        loadScreenData();
    }, [loadScreenData]);

    // --------------------------------------------------
    // Pull to refresh
    // --------------------------------------------------
    const handleRefresh = useCallback(async () => {
        setRefreshing(true);

        try {
            await fetchChapters();

            if (memberId !== null) {
                await Promise.all([
                    fetchPresentationDetails(memberId),
                    fetchNotifications(memberId),
                ]);
            }
        } finally {
            setRefreshing(false);
        }
    }, [
        fetchChapters,
        fetchPresentationDetails,
        fetchNotifications,
        memberId,
    ]);

    // --------------------------------------------------
    // Date and time pickers
    // --------------------------------------------------
    const handleDateChange = (_event: any, date?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');

        if (date) {
            setSelectedDate(date);
        }
    };

    const handleTimeChange = (_event: any, date?: Date) => {
        setShowTimePicker(Platform.OS === 'ios');

        if (date) {
            setSelectedTime(date);
        }
    };

    const resetForm = () => {
        setTopic('');
        setComment('');
        setSelectedChapterId(null);
        setSelectedDate(new Date());
        setSelectedTime(new Date());
    };

    // --------------------------------------------------
    // Submit presentation request
    // --------------------------------------------------
    const handleSubmit = async () => {
        if (memberId === null) {
            Alert.alert(
                'Login required',
                'Your member ID is unavailable. Please log in again.',
            );
            return;
        }

        if (!topic.trim()) {
            Alert.alert(
                'Required field',
                'Please enter your presentation topic.',
            );
            return;
        }

        if (selectedChapterId === null) {
            Alert.alert(
                'Required field',
                'Please select a chapter.',
            );
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const chosenDate = new Date(selectedDate);
        chosenDate.setHours(0, 0, 0, 0);

        if (chosenDate < today) {
            Alert.alert(
                'Invalid date',
                'Please select today or a future date.',
            );
            return;
        }

        const payload = {
            date: formatDate(selectedDate),
            time: `${formatTime(selectedTime)}:00`,
            member: memberId,
            topic: topic.trim(),
            chapter: selectedChapterId,
            comment: comment.trim() || null,
        };

        setSubmitting(true);

        try {
            const response: any = await addPresentationRequest(payload);

            Alert.alert(
                'Request submitted',
                'Your presentation request has been submitted successfully.',
            );

            resetForm();

            // Reload details and notifications after submitting.
            await Promise.all([
                fetchPresentationDetails(memberId, false),
                fetchNotifications(memberId),
            ]);
        } catch (error: any) {
            Alert.alert(
                'Submission failed',
                getErrorMessage(error),
            );
        } finally {
            setSubmitting(false);
        }
    };

    // --------------------------------------------------
    // Presentation details card
    // --------------------------------------------------
    const renderPresentationDetails = () => {
        if (detailsLoading) {
            return (
                <View style={styles.inlineLoader}>
                    <ActivityIndicator size="small" color="#4361ee" />
                    <Text style={styles.inlineLoaderText}>
                        Loading presentation details...
                    </Text>
                </View>
            );
        }

        if (!presentation) {
            return (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="document-text-outline"
                        size={42}
                        color="#C2C7D6"
                    />

                    <Text style={styles.emptyTitle}>
                        No Presentation Details
                    </Text>

                    <Text style={styles.emptyText}>
                        Presentation details will appear here when the server returns
                        a record for your member ID.
                    </Text>
                </View>
            );
        }

        const status = presentation.status || 'pending';

        const chapter = chapters.find(
            item => Number(item.id) === Number(presentation.chapter),
        );

        const chapterName = chapter?.chapter_name;

        return (
            <View style={styles.presentationCard}>
                <View style={styles.presentationHeader}>
                    <View style={styles.presentationTitleContainer}>
                        <Text style={styles.presentationTopic}>
                            {presentation.topic || 'Untitled Presentation'}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(status) },
                        ]}>
                        <Ionicons
                            name={getStatusIcon(status) as any}
                            size={14}
                            color="#fff"
                        />

                        <Text style={styles.statusText}>
                            {status.toUpperCase()}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                    <Ionicons
                        name="calendar-outline"
                        size={18}
                        color="#4361ee"
                    />

                    <Text style={styles.infoLabel}>Date</Text>

                    <Text style={styles.infoValue}>
                        {formatDisplayDate(presentation.date)}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons
                        name="time-outline"
                        size={18}
                        color="#4361ee"
                    />

                    <Text style={styles.infoLabel}>Time</Text>

                    <Text style={styles.infoValue}>
                        {formatDisplayTime(presentation.time)}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons
                        name="people-outline"
                        size={18}
                        color="#4361ee"
                    />

                    <Text style={styles.infoLabel}>Chapter</Text>

                    <Text style={styles.infoValue}>
                        {chapterName}
                    </Text>
                </View>

                {!!presentation.member_name && (
                    <View style={styles.infoRow}>
                        <Ionicons
                            name="person-outline"
                            size={18}
                            color="#4361ee"
                        />

                        <Text style={styles.infoLabel}>Member</Text>

                        <Text style={styles.infoValue}>
                            {presentation.member_name}
                        </Text>
                    </View>
                )}

                {!!presentation.comment && (
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentLabel}>Comment</Text>

                        <Text style={styles.commentValue}>
                            {presentation.comment}
                        </Text>
                    </View>
                )}

                {status.toLowerCase() === 'pending' && (
                    <View style={styles.statusMessageBox}>
                        <Ionicons
                            name="time-outline"
                            size={18}
                            color="#A66A00"
                        />

                        <Text style={styles.pendingMessage}>
                            Your presentation request is waiting for approval.
                        </Text>
                    </View>
                )}

                {status.toLowerCase() === 'rejected' && (
                    <View style={styles.rejectedMessageBox}>
                        <Ionicons
                            name="alert-circle-outline"
                            size={18}
                            color="#D32F2F"
                        />

                        <Text style={styles.rejectedMessage}>
                            Your presentation request has been rejected.
                        </Text>
                    </View>
                )}

                {status.toLowerCase() === 'approved' && (
                    <View style={styles.approvedMessageBox}>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={18}
                            color="#2E7D32"
                        />

                        <Text style={styles.approvedMessage}>
                            Your presentation request has been approved.
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    // --------------------------------------------------
    // Notification card
    // --------------------------------------------------
    const renderNotificationCard = (
        item: PresentationNotification,
    ) => {
        const status = item.presentation_status || 'pending';

        return (
            <View key={String(item.id)} style={styles.notificationCard}>
                <View style={styles.notificationIcon}>
                    <Ionicons
                        name={getStatusIcon(status) as any}
                        size={25}
                        color={getStatusColor(status)}
                    />
                </View>

                <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>
                        {item.title || 'Presentation Update'}
                    </Text>

                    <Text style={styles.notificationMessage}>
                        {item.message ||
                            `Your presentation request for "${item.presentation_topic || 'your topic'
                            }" is ${status}.`}
                    </Text>

                    {!!item.created_at && (
                        <Text style={styles.notificationDate}>
                            {new Date(item.created_at).toLocaleString('en-IN')}
                        </Text>
                    )}
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaWrapper>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#4361ee" />

                    <Text style={styles.loadingText}>
                        Loading presentation details...
                    </Text>
                </View>
            </SafeAreaWrapper>
        );
    }

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* Header */}
                <LinearGradient
                    colors={['#4361ee', '#3f37c9']}
                    style={styles.header}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Presentation Requests
                    </Text>
                </LinearGradient>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={['#4361ee']}
                        />
                    }>
                    {/* Request form */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>
                            Request a Presentation
                        </Text>

                        <Text style={styles.label}>Presentation Date*</Text>

                        <TouchableOpacity
                            style={styles.pickerButton}
                            onPress={() => setShowDatePicker(true)}>
                            <Ionicons
                                name="calendar-outline"
                                size={20}
                                color="#4361ee"
                            />

                            <Text style={styles.pickerButtonText}>
                                {formatDisplayDate(formatDate(selectedDate))}
                            </Text>

                            <Ionicons
                                name="chevron-down"
                                size={18}
                                color="#666"
                            />
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                minimumDate={new Date()}
                                onChange={handleDateChange}
                            />
                        )}

                        <Text style={styles.label}>Presentation Time*</Text>

                        <TouchableOpacity
                            style={styles.pickerButton}
                            onPress={() => setShowTimePicker(true)}>
                            <Ionicons
                                name="time-outline"
                                size={20}
                                color="#4361ee"
                            />

                            <Text style={styles.pickerButtonText}>
                                {formatDisplayTime(formatTime(selectedTime))}
                            </Text>

                            <Ionicons
                                name="chevron-down"
                                size={18}
                                color="#666"
                            />
                        </TouchableOpacity>

                        {showTimePicker && (
                            <DateTimePicker
                                value={selectedTime}
                                mode="time"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={handleTimeChange}
                            />
                        )}

                        <Text style={styles.label}>Chapter*</Text>

                        <Dropdown
                            style={styles.dropdown}
                            containerStyle={styles.dropdownContainer}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            data={chapters.map(chapter => ({
                                label:
                                    chapter.chapter_name ||
                                    chapter.name ||
                                    chapter.title ||
                                    `Chapter ${chapter.id}`,
                                value: chapter.id,
                            }))}
                            labelField="label"
                            valueField="value"
                            placeholder="Select chapter"
                            value={selectedChapterId}
                            onChange={item =>
                                setSelectedChapterId(Number(item.value))
                            }
                            renderLeftIcon={() => (
                                <Ionicons
                                    name="people-outline"
                                    size={20}
                                    color="#4361ee"
                                    style={styles.dropdownIcon}
                                />
                            )}
                            disable={chapters.length === 0}
                        />

                        <Text style={styles.label}>Presentation Topic*</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter your presentation topic"
                            placeholderTextColor="#999"
                            value={topic}
                            onChangeText={setTopic}
                            maxLength={200}
                        />

                        <Text style={styles.label}>Comment</Text>

                        <TextInput
                            style={[styles.input, styles.commentInput]}
                            placeholder="Enter additional information (optional)"
                            placeholderTextColor="#999"
                            value={comment}
                            onChangeText={setComment}
                            multiline
                            textAlignVertical="top"
                            maxLength={1000}
                        />

                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                submitting && styles.disabledButton,
                            ]}
                            onPress={handleSubmit}
                            disabled={submitting}>
                            {submitting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Ionicons
                                        name="paper-plane-outline"
                                        size={19}
                                        color="#fff"
                                    />

                                    <Text style={styles.submitButtonText}>
                                        Submit Request
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Presentation rules */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeadingRow}>
                            <Ionicons
                                name="information-circle-outline"
                                size={23}
                                color="#4361ee"
                            />

                            <Text style={styles.sectionTitle}>
                                Presentation Rules
                            </Text>
                        </View>

                        {[
                            'Each presentation is limited to 10 minutes.',
                            'A member can present once per month.',
                            'Your request must be approved before presenting.',
                            'Choose a relevant topic for the group.',
                            'Please arrive on time and respect other presenters.',
                        ].map((rule, index) => (
                            <View key={index} style={styles.ruleRow}>
                                <Ionicons
                                    name="checkmark-circle"
                                    size={18}
                                    color="#2E7D32"
                                />

                                <Text style={styles.ruleText}>{rule}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Presentation details from API */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeadingRow}>
                            <Ionicons
                                name="document-text-outline"
                                size={23}
                                color="#4361ee"
                            />

                            <Text style={styles.sectionTitle}>
                                My Presentation Details
                            </Text>
                        </View>

                        {renderPresentationDetails()}
                    </View>

                    {/* Approval notifications */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeadingRow}>
                            <Ionicons
                                name="notifications-outline"
                                size={23}
                                color="#4361ee"
                            />

                            <Text style={styles.sectionTitle}>
                                Approval Notifications
                            </Text>
                        </View>

                        {notifications.length === 0 ? (
                            <Text style={styles.emptyText}>
                                No presentation notifications available.
                            </Text>
                        ) : (
                            notifications.map(renderNotificationCard)
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default PresentationScreen;