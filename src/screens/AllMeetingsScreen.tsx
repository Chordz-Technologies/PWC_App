import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert, Linking, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/AllMeetingsScreenStyle';
import { updateMeetingAttendance } from '../services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllMeetingsScreen = ({ navigation, route }: any) => {
    const meetings = route.params?.meetings || [];
    const [attending, setAttending] = React.useState<{
        [key: number]: boolean;
    }>({});
    const formatDateTime = (date: string, time: string) => {
        const d = new Date(`${date}T${time}`);
        const formattedDate = d.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
        });

        const formattedTime = d.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedDate} at ${formattedTime}`;
    };
    const [userRole, setUserRole] = React.useState('');
    const [userChapter, setUserChapter] = React.useState<number | null>(null);

    React.useEffect(() => {
        const initialState: any = {};

        meetings.forEach((item: any) => {
            initialState[item.id] = item.attending === 1;
        });

        setAttending(initialState);

        const loadUser = async () => {
            const role = await AsyncStorage.getItem('role');
            const chapter = await AsyncStorage.getItem('chapter_id');

            setUserRole(role || '');
            setUserChapter(chapter ? Number(chapter) : null);
        };

        loadUser();
    }, []);

    const handleAttendance = async (
        meetingId: number,
        value: boolean,
    ) => {
        // Smooth UI update
        setAttending(prev => ({
            ...prev,
            [meetingId]: value,
        }));

        try {
            await updateMeetingAttendance(
                meetingId,
                value ? 1 : 0,
            );

            setAttending(prev => ({
                ...prev,
                [meetingId]: value,
            }));

        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Unable to update attendance',
            );
        }
    };

    const openRazorpayLink = async () => {
        const url = 'https://razorpay.me/@punewomensclub';

        try {
            await Linking.openURL(url);
        } catch (error) {
            Alert.alert(
                'Error', 'Unable to open payment page.'
            );
        }
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
                            const showEnrollButton =
                                userRole.toUpperCase() === 'VISITOR' ||
                                userChapter !== Number(item.chapter);

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

                                                <Text style={styles.memberName}>
                                                    {item.person2}
                                                </Text>

                                                <Text style={styles.meetingTime}>
                                                    {formatDateTime(item.date, item.time)}
                                                </Text>

                                                <Text style={styles.venue}>
                                                    📍 {item.venue}
                                                </Text>
                                            </View>
                                            <Text style={styles.meetingTitle}>
                                                ₹ {item.price}
                                            </Text>
                                        </View>

                                        <View style={styles.bottomActions}>

                                            {/* Attending */}
                                            <View style={styles.attendingContainer}>
                                                <Switch
                                                    value={attending[item.id] || false}
                                                    onValueChange={(value) =>
                                                        handleAttendance(item.id, value)
                                                    }
                                                    trackColor={{
                                                        false: '#d1d5db',
                                                        true: '#0fab21',
                                                    }}
                                                    thumbColor="#fff"
                                                />
                                                <Text style={styles.attendingText}>
                                                    Attending
                                                </Text>
                                            </View>

                                            {/* Add Visitor */}
                                            <TouchableOpacity
                                                style={styles.actionButton}
                                                onPress={() => navigation.navigate('AddVisitor')}
                                            >
                                                <Icon
                                                    name="person-add-outline"
                                                    size={16} color="#fff"
                                                />
                                                <Text style={styles.actionButtonText}>
                                                    Add Visitor
                                                </Text>
                                            </TouchableOpacity>

                                            {/* Enroll Now */}
                                            {showEnrollButton && (
                                                <TouchableOpacity
                                                    style={[styles.actionButton, { backgroundColor: '#10b981' }]}
                                                    onPress={openRazorpayLink}
                                                >
                                                    <Icon
                                                        name="checkmark-circle-outline"
                                                        size={16}
                                                        color="#fff"
                                                    />
                                                    <Text style={styles.actionButtonText}>
                                                        Enroll Now
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
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