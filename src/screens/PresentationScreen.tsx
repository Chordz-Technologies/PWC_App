import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/PresentationScreenStyle';
import { addPresentationRequest, getPresentationNotifications, getAllChapters } from '../services/authApi';

type PresentationStatus = 'pending' | 'approved' | 'rejected';

interface PresentationRequest {
    id?: number | string;
    date?: string | null;
    time?: string | null;
    member?: number;
    member_name?: string;
    topic?: string | null;
    chapter?: number | null;
    comment?: string | null;
    status?: PresentationStatus;
}

const PresentationScreen = ({ navigation }: any) => {
    type Chapter = {
        id: number;
        name: string;
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

    const [loadingChapters, setLoadingChapters] = useState(false);


    const [memberId, setMemberId] = useState<number | null>(null);
    const [chapterId, setChapterId] = useState<number | null>(null);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [topic, setTopic] = useState('');
    const [comment, setComment] = useState('');

    const [requests, setRequests] = useState<PresentationRequest[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

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

    const handleDateChange = (event: any, date?: Date) => {
        setShowDatePicker(Platform.OS === 'ios' && event.type === 'set');

        if (event.type === 'set' && date) {
            setSelectedDate(date);
        }
    };

    const handleTimeChange = (event: any, time?: Date) => {
        setShowTimePicker(Platform.OS === 'ios' && event.type === 'set');

        if (event.type === 'set' && time) {
            setSelectedTime(time);
        }
    };

    const loadNotifications = useCallback(async () => {
        try {
            const response = await getPresentationNotifications();

            console.log('Presentation notifications:', response);

            // Supports common API response structures.
            const data = response.results

            if (Array.isArray(data)) {
                setNotifications(data);
            } else {
                setNotifications([]);
            }
        } catch (error: any) {
            console.log(
                'Presentation notification error:',
                error?.response?.data || error,
            );
            setNotifications([]);
        }
    }, []);

    const loadScreen = useCallback(async () => {
        try {
            const storedMemberId = await AsyncStorage.getItem('userId');
            const storedChapterId = await AsyncStorage.getItem('chapter_id');

            if (storedMemberId) {
                setMemberId(Number(storedMemberId));
            }

            if (storedChapterId) {
                setChapterId(Number(storedChapterId));
            }

            await loadNotifications();
        } catch (error) {
            console.log('Load presentation screen error:', error);
        } finally {
            setLoading(false);
        }
    }, [loadNotifications]);

    const fetchChapters = async () => {
        try {
            setLoadingChapters(true);
            const response = await getAllChapters();
            const chapterList = Array.isArray(response) ? response : response?.all_chapters;
            if (!Array.isArray(chapterList)) {
                setChapters([]);
                return;
            }
            const formattedChapters: Chapter[] = chapterList.map(
                (item: any) => ({
                    id: Number(item.id),
                    name: item.chapterName
                }),
            );
            setChapters(formattedChapters.filter(item => Number.isFinite(item.id)));
        } catch (error: any) {
            Alert.alert('Error', 'Failed to load chapters.');
        } finally {
            setLoadingChapters(false);
        }
    };

    useEffect(() => {
        loadScreen();
        fetchChapters();
    }, [loadScreen]);

    // const onRefresh = async () => {
    //     setRefreshing(true);
    //     await loadScreen();
    //     setRefreshing(false);
    // };

    const handleSubmit = async () => {
        if (!selectedDate) {
            Alert.alert('Validation', 'Please select a presentation date.');
            return;
        }

        if (!selectedTime) {
            Alert.alert('Validation', 'Please select a presentation time.');
            return;
        }

        if (selectedChapterId === null) {
            Alert.alert('Validation', 'Please select a chapter.');
            return;
        }

        if (!topic.trim()) {
            Alert.alert('Validation', 'Please enter a presentation topic.');
            return;
        }

        try {
            setSubmitting(true);

            const memberId = await AsyncStorage.getItem('userId');

            if (!memberId || !Number.isFinite(Number(memberId))) {
                Alert.alert('Error', 'Member ID not found. Please log in again.');
                return;
            }

            const payload = {
                date: formatDate(selectedDate),
                time: formatTime(selectedTime),
                member: Number(memberId),
                topic: topic.trim(),
                chapter: selectedChapterId,
                comment: comment.trim() || null,
            };

            console.log('Presentation request payload:', payload);

            const response = await addPresentationRequest(payload);

            console.log('Presentation API response:', response);

            Alert.alert(
                'Success',
                response?.message ?? 'Presentation request submitted successfully.',
            );

            setSelectedDate(null);
            setSelectedTime(null);
            setSelectedChapterId(null);
            setTopic('');
            setComment('');

            // Refresh your existing request/notification list here if needed.
        } catch (error: any) {
            console.error(
                'Presentation request error:',
                error?.response?.data ?? error,
            );

            Alert.alert(
                'Error',
                error?.response?.data?.message ??
                'Failed to submit presentation request.',
            );
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return '#16803c';
            case 'rejected':
                return '#dc2626';
            default:
                return '#b7791f';
        }
    };

    const getStatusIcon = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'checkmark-circle';
            case 'rejected':
                return 'close-circle';
            default:
                return 'time-outline';
        }
    };

    const renderStatus = (status?: string) => {
        const normalizedStatus = status?.toLowerCase() || 'pending';

        return (
            <View
                style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(normalizedStatus)}15` },
                ]}>
                <Icon
                    name={getStatusIcon(normalizedStatus)}
                    size={16}
                    color={getStatusColor(normalizedStatus)}
                />
                <Text
                    style={[
                        styles.statusText,
                        { color: getStatusColor(normalizedStatus) },
                    ]}>
                    {normalizedStatus.charAt(0).toUpperCase() +
                        normalizedStatus.slice(1)}
                </Text>
            </View>
        );
    };

    // Show notification messages that look like presentation rules.
    const getNotificationMessage = (item: any): string => {
        if (typeof item === 'string') {
            return item;
        }

        return (
            item?.message ??
            item?.description ??
            item?.notification ??
            item?.title ??
            ''
        );
    };

    const approvedRequests = requests.filter(
        item => item.status?.toLowerCase() === 'approved',
    );

    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.container}>

                    <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header} >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>
                            Presentation Requests
                        </Text>
                        <View style={{ width: 24 }} />
                    </LinearGradient>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="#4361ee"
                            style={{ marginTop: 40 }}
                        />
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {/* REQUEST FORM */}
                            <View style={styles.card}>
                                <View style={styles.sectionHeading}>
                                    <Icon name="document-text-outline" size={22} color="#4361ee" />
                                    <Text style={styles.sectionTitle}>
                                        Request a Presentation
                                    </Text>
                                </View>

                                {/* Presentation Date */}
                                <View style={styles.fieldContainer}>
                                    <Text style={styles.label}>Presentation Date</Text>

                                    <TouchableOpacity
                                        style={styles.pickerButton}
                                        onPress={() => setShowDatePicker(true)}>
                                        <Text
                                            style={[
                                                styles.pickerText,
                                                !selectedDate && styles.placeholderText,
                                            ]}>
                                            {selectedDate
                                                ? formatDate(selectedDate)
                                                : 'Select presentation date'}
                                        </Text>
                                    </TouchableOpacity>

                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={selectedDate ?? new Date()}
                                            mode="date"
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            minimumDate={new Date()}
                                            onChange={handleDateChange}
                                        />
                                    )}
                                </View>

                                {/* Presentation Time */}
                                <View style={styles.fieldContainer}>
                                    <Text style={styles.label}>Presentation Time</Text>

                                    <TouchableOpacity
                                        style={styles.pickerButton}
                                        onPress={() => setShowTimePicker(true)}>
                                        <Text
                                            style={[
                                                styles.pickerText,
                                                !selectedTime && styles.placeholderText,
                                            ]}>
                                            {selectedTime
                                                ? formatTime(selectedTime)
                                                : 'Select presentation time'}
                                        </Text>
                                    </TouchableOpacity>

                                    {showTimePicker && (
                                        <DateTimePicker
                                            value={selectedTime ?? new Date()}
                                            mode="time"
                                            is24Hour
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            onChange={handleTimeChange}
                                        />
                                    )}
                                </View>

                                {/* Chapter Dropdown */}
                                <View style={styles.fieldContainer}>
                                    <Text style={styles.label}>Select Chapter</Text>

                                    {loadingChapters ? (
                                        <ActivityIndicator color="#4361ee" />
                                    ) : (
                                        <Dropdown
                                            style={styles.dropdown}
                                            containerStyle={styles.dropdownList}
                                            placeholderStyle={styles.placeholderText}
                                            selectedTextStyle={styles.pickerText}
                                            itemTextStyle={styles.dropdownItemText}
                                            data={chapters.map(chapter => ({
                                                label: chapter.name,
                                                value: chapter.id,
                                            }))}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select chapter"
                                            value={selectedChapterId}
                                            onChange={item => {
                                                setSelectedChapterId(Number(item.value));
                                            }}
                                        />
                                    )}
                                </View>

                                <Text style={styles.label}>Presentation Topic*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter presentation topic"
                                    placeholderTextColor="#999"
                                    value={topic}
                                    onChangeText={setTopic}
                                />

                                <Text style={styles.label}>Comment</Text>
                                <TextInput
                                    style={[styles.input, styles.commentInput]}
                                    placeholder="Add a message or comment (optional)"
                                    placeholderTextColor="#999"
                                    value={comment}
                                    onChangeText={setComment}
                                    multiline
                                    textAlignVertical="top"
                                />

                                <TouchableOpacity
                                    style={[
                                        styles.submitButton,
                                        submitting && styles.disabledButton,
                                    ]}
                                    onPress={handleSubmit}
                                    disabled={submitting}
                                    activeOpacity={0.8}>
                                    {submitting ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <>
                                            <Icon name="send-outline" size={18} color="#fff" />
                                            <Text style={styles.submitButtonText}>
                                                Submit Request
                                            </Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>

                            {/* REQUEST STATUS */}
                            <View style={styles.card}>
                                <View style={styles.sectionHeading}>
                                    <Icon name="list-outline" size={22} color="#4361ee" />
                                    <Text style={styles.sectionTitle}>My Requests</Text>
                                </View>

                                {requests.length === 0 ? (
                                    <Text style={styles.emptyText}>
                                        No requests submitted in this session. Previously submitted
                                        requests require a request-list API to load.
                                    </Text>
                                ) : (
                                    requests.map((item, index) => (
                                        <View
                                            key={String(item.id ?? `${item.topic}-${index}`)}
                                            style={styles.requestCard}>
                                            <View style={styles.requestHeader}>
                                                <Text style={styles.requestTopic}>
                                                    {item.topic || 'Presentation'}
                                                </Text>
                                                {renderStatus(item.status)}
                                            </View>

                                            <Text style={styles.detailText}>
                                                Date: {item.date || 'Not specified'}
                                            </Text>
                                            <Text style={styles.detailText}>
                                                Time: {item.time || 'Not specified'}
                                            </Text>
                                            {!!item.comment && (
                                                <Text style={styles.detailText}>
                                                    Comment: {item.comment}
                                                </Text>
                                            )}

                                            {item.status?.toLowerCase() === 'pending' && (
                                                <Text style={styles.statusMessage}>
                                                    Your request is waiting for admin approval.
                                                </Text>
                                            )}

                                            {item.status?.toLowerCase() === 'rejected' && (
                                                <Text style={styles.rejectedMessage}>
                                                    Your request was rejected. Please contact the admin
                                                    for further information.
                                                </Text>
                                            )}

                                            {item.status?.toLowerCase() === 'approved' && (
                                                <Text style={styles.approvedMessage}>
                                                    Your presentation request has been approved. Please
                                                    review the presentation rules below.
                                                </Text>
                                            )}
                                        </View>
                                    ))
                                )}
                            </View>

                            {/* APPROVED REQUEST MESSAGE */}
                            {approvedRequests.length > 0 && (
                                <View style={styles.approvedBanner}>
                                    <Icon name="checkmark-circle" size={24} color="#16803c" />
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text style={styles.approvedTitle}>
                                            Presentation Approved
                                        </Text>
                                        <Text style={styles.approvedMessage}>
                                            Your request has been accepted by the admin. Please read
                                            the presentation rules and regulations below.
                                        </Text>
                                    </View>
                                </View>
                            )}

                            {/* ADMIN NOTIFICATIONS / RULES */}
                            <View style={styles.card}>
                                <View style={styles.sectionHeading}>
                                    <Icon name="clipboard-outline" size={22} color="#4361ee" />
                                    <Text style={styles.sectionTitle}>
                                        Presentation Rules & Notifications
                                    </Text>
                                </View>

                                {notifications.length === 0 ? (
                                    <Text style={styles.emptyText}>
                                        No presentation notifications or rules available yet.
                                    </Text>
                                ) : (
                                    notifications.map((item, index) => {
                                        const message = getNotificationMessage(item);

                                        if (!message) {
                                            return null;
                                        }

                                        return (
                                            <View
                                                key={String(item?.id ?? index)}
                                                style={styles.notificationItem}>
                                                <Icon
                                                    name="information-circle-outline"
                                                    size={20}
                                                    color="#4361ee"
                                                />
                                                <Text style={styles.notificationText}>{message}</Text>
                                            </View>
                                        );
                                    })
                                )}
                            </View>
                        </ScrollView>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default PresentationScreen;