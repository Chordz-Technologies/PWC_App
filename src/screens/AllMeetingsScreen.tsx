import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert, Linking, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/AllMeetingsScreenStyle';
import { addAttendee, deleteAttendee, updateMeetingAttendance } from '../services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllMeetingsScreen = ({ navigation, route }: any) => {
    const meetings = route.params?.meetings || [];
    const [attending, setAttending] = React.useState<{ [key: number]: boolean; }>({});
    const [userRole, setUserRole] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const attendeeIdsRef = useRef<{ [key: number]: number }>({});

    React.useEffect(() => {
        const initialState: any = {};

        meetings.forEach((item: any) => {
            initialState[item.id] = item.attending === 1;
        });

        setAttending(initialState);

        const loadUser = async () => {
            const name = await AsyncStorage.getItem('userName');
            const role = await AsyncStorage.getItem('role');

            setUserName(name || '');
            setUserRole(role || '');
        };

        loadUser();
    }, []);

    const openMeetingLink = async (url: string) => {
        if (!url) {
            Alert.alert('Meeting Link', 'Meeting link is not available.');
            return;
        }

        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert('Error', 'Unable to open meeting link.');
        }
    };

    const handleAttendance = async (
        meeting: any,
        value: boolean,
    ) => {

        // Update UI immediately
        setAttending(prev => ({
            ...prev,
            [meeting.id]: value,
        }));

        try {
            if (value) {
                // 1. Add attendee
                const response = await addAttendee({
                    meet: meeting.id,
                    name: userName,
                    role: userRole,
                    attending: 1,
                });

                const attendeeId = response?.new_attendance?.id;

                if (!attendeeId) {
                    throw new Error('Attendee ID not found');
                }

                // Store attendee id immediately
                attendeeIdsRef.current[meeting.id] = attendeeId;

                // 2. Update meeting attendance = 1
                await updateMeetingAttendance(
                    meeting.id,
                    1,
                );
            } else {
                const attendeeId = attendeeIdsRef.current[meeting.id];

                if (attendeeId) {
                    // Delete attendee
                    await deleteAttendee(attendeeId);

                    // Remove from ref
                    delete attendeeIdsRef.current[meeting.id];
                } else {
                    console.log('Attendee ID not found.');
                }
                // Update meeting attendance = 0
                await updateMeetingAttendance(
                    meeting.id,
                    0,
                );
            }
        } catch (error: any) {
            // Rollback UI
            setAttending(prev => ({
                ...prev,
                [meeting.id]: !value,
            }));

            Alert.alert('Error', error?.message || 'Unable to update attendance',);
        }
    };

    const formatDate = (date: string) => {
        const d = new Date(date);

        return d.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatTime = (time: string) => {
        const d = new Date(`1970-01-01T${time}`);

        return d.toLocaleTimeString('en-IN', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Upcoming Meetings</Text>
                </LinearGradient>

                <ScrollView
                    contentContainerStyle={{
                        padding: 15,
                        paddingBottom: 30,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {meetings.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No Meetings Found
                        </Text>
                    ) : (
                        meetings.map((item: any) => {
                            return (
                                <View key={item.id} style={styles.card}>
                                    <View style={styles.cardContent}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.avatarIcon}>
                                                <Icon
                                                    name="person"
                                                    size={22}
                                                    color="#4361ee"
                                                />
                                            </View>
                                            <View style={{ flex: 1, marginLeft: 12, }}>
                                                <Text style={styles.meetingTitle}>
                                                    {item.title || 'Meeting'}
                                                </Text>

                                                <Text style={styles.meetingTime}>
                                                    {formatDate(item.date)} | {formatTime(item.start_time)} - {formatTime(item.end_time)}
                                                </Text>

                                                <Text style={styles.venue}>
                                                    📍 {item.venue}
                                                </Text>
                                            </View>
                                            <Text style={styles.meetingTitle}>
                                                ₹ {item.fees}
                                            </Text>
                                        </View>

                                        <View style={styles.bottomActions}>

                                            {/* Attending Toggle */}
                                            <View style={styles.attendingContainer}>

                                                <Switch
                                                    value={attending[item.id] || false}
                                                    onValueChange={(value) =>
                                                        handleAttendance(item, value)
                                                    }
                                                    trackColor={{
                                                        false: '#d1d5db',
                                                        true: '#10b981',
                                                    }}
                                                    thumbColor="#fff"
                                                />

                                                <Text
                                                    style={[
                                                        styles.attendingText,
                                                        {
                                                            color: attending[item.id]
                                                                ? '#10b981'
                                                                : '#ef4444',
                                                            fontWeight: '700',
                                                        },
                                                    ]}
                                                >
                                                    {attending[item.id]
                                                        ? 'Attending'
                                                        : 'Not Attending'}
                                                </Text>

                                            </View>

                                            {/* Buttons Row */}
                                            <View style={styles.buttonRow}>

                                                <TouchableOpacity
                                                    style={styles.actionButton}
                                                    onPress={() => openMeetingLink(item.meeting_link)}
                                                >
                                                    <Icon
                                                        name="videocam-outline"
                                                        size={16}
                                                        color="#fff"
                                                    />
                                                    <Text style={styles.actionButtonText}>
                                                        Meeting Link
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={styles.actionButton}
                                                    onPress={() =>
                                                        navigation.navigate('AddVisitor', {
                                                            meetingId: item.id,
                                                        })
                                                    }
                                                >
                                                    <Icon
                                                        name="person-add-outline"
                                                        size={16}
                                                        color="#fff"
                                                    />
                                                    <Text style={styles.actionButtonText}>
                                                        Add Visitor
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default AllMeetingsScreen;