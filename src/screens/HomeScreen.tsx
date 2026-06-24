import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/HomeScreenStyle';
import { getCarouselImages, getAllMeetings } from '../services/authApi';
import SafeAreaWrapper from './SafeAreaWrapper';
import { getUnreadCount, markAllAsRead, showLocalNotification, notificationEmitter } from "../services/notificationStorage";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [meetings, setMeetings] = useState<any[]>([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const loadNotificationCount = async () => {
        try {
            const count = await getUnreadCount();
            setNotificationCount(count);
        } catch (error) {
            console.error('Error loading notification count:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadMeetings();
        }, [])
    );

    useEffect(() => {

        loadAllData();
        loadNotificationCount();

        // Listen for updates via emitter
        const updateBadge = async () => {
            const count = await getUnreadCount();
            setNotificationCount(count);
        };
        notificationEmitter.on('newNotification', updateBadge);

        // Handle FCM foreground messages - FIXED VERSION
        const unsubscribe = messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            console.log('Foreground message:', remoteMessage);
            const notificationRaw = remoteMessage.notification || {
                title: remoteMessage.data?.title,
                body: remoteMessage.data?.body,
            };
            const notification = {
                title: typeof notificationRaw.title === 'string' ? notificationRaw.title : JSON.stringify(notificationRaw.title),
                body: typeof notificationRaw.body === 'string' ? notificationRaw.body : JSON.stringify(notificationRaw.body),
            };
            await showLocalNotification(notification);
        });

        return () => {
            unsubscribe();
            notificationEmitter.removeListener('newNotification', updateBadge);
        };
    }, []);

    const loadMeetings = async () => {
        try {
            const meetingRes = await getAllMeetings();

            if (meetingRes?.all_meetings) {
                setMeetings(meetingRes.all_meetings);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadAllData = async () => {
        try {
            const name = await AsyncStorage.getItem('userName');

            if (name) {
                setUserName(name);
            }

            const [carouselRes] = await Promise.all([
                getCarouselImages(),
                // name ? getMyMeetings(name) : Promise.resolve(null),
                // getAllMeetings()
            ]);

            if (carouselRes?.all_images) {
                setImages(carouselRes.all_images);
            }

            // if (meetingRes?.all_meetings) {
            //     setMeetings(meetingRes.all_meetings);
            // }

            // if (meetingRes?.person1_meetings) {
            //     setMeetings(meetingRes.person1_meetings);
            // }

        } catch (error) {
            console.log('Home API Error', error);
        } finally {
            setLoading(false); // ✅ only once after ALL APIs
        }
    }

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

    if (loading) {
        return (
            <SafeAreaWrapper>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#4361ee" />
                </View>
            </SafeAreaWrapper>
        );
    }

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <View style={styles.headerTopRow}>

                        {/* LEFT SIDE TEXT */}
                        <View>
                            <Text style={styles.welcomeText}>Welcome</Text>
                            <Text style={styles.username}>
                                {userName || 'User'}
                            </Text>
                        </View>

                        {/* RIGHT SIDE ICONS */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <TouchableOpacity
                                style={{ marginRight: 5 }}
                                onPress={async () => {
                                    await markAllAsRead();
                                    setNotificationCount(0);
                                    navigation.navigate('Notifications');
                                }}
                            >
                                <View>
                                    <Icon
                                        name="notifications-outline"
                                        size={26}
                                        color="#fff"
                                    />

                                    {notificationCount > 0 && (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: -5,
                                                right: -5,
                                                backgroundColor: 'red',
                                                borderRadius: 10,
                                                minWidth: 18,
                                                height: 18,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                paddingHorizontal: 4,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {notificationCount}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* 🔷 CAROUSEL */}
                    <View style={styles.swiperContainer}>
                        <Swiper autoplay showsPagination={false} loop>
                            {images.map((item, index) => (
                                <View key={index} style={styles.bannerWrapper}>
                                    <Image source={{ uri: item.img }} style={styles.bannerImage} />
                                </View>
                            ))}
                        </Swiper>
                    </View>

                    {/* 🔷 EXPLORE */}
                    <Text style={styles.sectionTitle}>Explore</Text>
                    <View style={styles.cardRow}>

                        {/* 1:1 */}
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('OneToOne')}
                        >
                            <View style={styles.iconBox}>
                                <Icon name="calendar-outline" size={24} color="#4361ee" />
                            </View>
                            <Text style={styles.cardTitle}>
                                Schedule 1:1
                            </Text>
                            <Text style={styles.cardSub}>
                                Plan meaningful business meetings
                            </Text>
                        </TouchableOpacity>

                        {/* REFERRAL */}
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('AddReferral')}
                        >
                            <View style={styles.iconBox}>
                                <Icon name="book-outline" size={24} color="#4361ee" />
                            </View>
                            <Text style={styles.cardTitle}>
                                Add Referral
                            </Text>
                            <Text style={styles.cardSub}>
                                Recommend reliable members easily
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* 🔷 UPCOMING EVENTS CARD */}
                    <TouchableOpacity
                        style={styles.eventCard}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Events')}
                    >
                        <View style={styles.eventLeft}>
                            <View style={styles.eventIconBox}>
                                <Icon name="calendar" size={24} color="#4361ee" />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.eventTitle}>
                                    Upcoming Events
                                </Text>
                                <Text style={styles.eventSub}>
                                    Check all upcoming events
                                </Text>
                            </View>
                        </View>
                        <Icon name="chevron-forward" size={24} color="#4361ee" />
                    </TouchableOpacity>

                    {/* 🔷 UPCOMING */}
                    <View style={styles.rowBetween}>
                        <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('AllMeetings', {
                                    meetings
                                })
                            }
                        >
                            <Text style={styles.viewAll}>
                                View All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingHorizontal: 15, marginTop: 10 }}>

                        {meetings.length === 0 ? (
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>
                                No Meetings Found
                            </Text>
                        ) : (
                            meetings.slice(0, 2).map((item) => (
                                <View key={item.id} style={styles.meetingCard}>

                                    {/* Avatar (default image) */}
                                    <View style={styles.avatarIcon}>
                                        <Icon name="person" size={22} color="#4361ee" />
                                    </View>

                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text style={styles.meetingTitle}>
                                            {item.title || 'Meeting'}
                                        </Text>

                                        <Text style={styles.meetingName}>
                                            {item.person2}
                                        </Text>

                                        <Text style={styles.meetingTime}>
                                            {formatDateTime(item.date, item.time)}
                                        </Text>
                                        <Text style={styles.meetingName}>
                                            {item.venue}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default HomeScreen;
