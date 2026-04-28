import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/HomeScreenStyle';
import { getCarouselImages } from '../services/authApi';

const HomeScreen = ({ navigation }: any) => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetchCarousel(); getUserData();
    }, []);

    const getUserData = async () => {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
            setUserName(name);
        }
    };

    const fetchCarousel = async () => {
        try {
            const response = await getCarouselImages();
            if (response?.all_images) {
                setImages(response.all_images);
            }
        } catch (error) {
            console.log('Carousel API Error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await AsyncStorage.clear();
                        navigation.replace('Login');
                    },
                },
            ]
        );
    };

    return (
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

                        {/* Notification */}
                        <TouchableOpacity style={{ marginRight: 15 }}>
                            <Icon name="notifications-outline" size={26} color="#fff" />
                        </TouchableOpacity>

                        {/* Logout */}
                        <TouchableOpacity onPress={handleLogout}>
                            <Icon name="log-out-outline" size={26} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔷 CAROUSEL */}
                {loading ? (
                    <ActivityIndicator size="large" color="#4361ee" style={{ marginTop: 20 }} />
                ) : (
                    <View style={styles.swiperContainer}>
                        <Swiper autoplay showsPagination={false} loop>
                            {images.map((item, index) => (
                                <View key={index} style={styles.bannerWrapper}>
                                    <Image source={{ uri: item.img }} style={styles.bannerImage} />
                                </View>
                            ))}
                        </Swiper>
                    </View>
                )}

                {/* 🔷 EXPLORE */}
                <Text style={styles.sectionTitle}>Explore</Text>

                <View style={styles.cardRow}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('OneToOne')}
                    >
                        <View style={styles.iconBox}>
                            <Icon name="calendar-outline" size={24} color="#4361ee" />
                        </View>
                        <Text style={styles.cardTitle}>Schedule 1:1</Text>
                        <Text style={styles.cardSub}>Plan meaningful business meetings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('AddReference')}
                    >
                        <View style={styles.iconBox}>
                            <Icon name="book-outline" size={24} color="#4361ee" />
                        </View>
                        <Text style={styles.cardTitle}>Add Reference</Text>
                        <Text style={styles.cardSub}>Recommend reliable members easily</Text>
                    </TouchableOpacity>
                </View>

                {/* 🔷 UPCOMING */}
                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
                    <Text style={styles.viewAll}>View All</Text>
                </View>
                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
                    {[
                        {
                            id: 1,
                            title: 'Marketing Strategy',
                            name: 'Priya Deskmukh',
                            time: 'Apr 10 at 10:00 AM',
                            image: 'https://randomuser.me/api/portraits/women/44.jpg',
                        },
                        {
                            id: 2,
                            title: 'Creative Studio',
                            name: 'Amit Gaikwad',
                            time: 'Apr 10 at 10:00 AM',
                            image: 'https://randomuser.me/api/portraits/men/32.jpg',
                        },
                        {
                            id: 3,
                            title: 'Marketing Strategy',
                            name: 'Priya Deskmukh',
                            time: 'Apr 10 at 10:00 AM',
                            image: 'https://randomuser.me/api/portraits/women/44.jpg',
                        },
                        {
                            id: 4,
                            title: 'Creative Studio',
                            name: 'Amit Gaikwad',
                            time: 'Apr 10 at 10:00 AM',
                            image: 'https://randomuser.me/api/portraits/men/32.jpg',
                        },
                    ].map((item) => (
                        <View key={item.id} style={styles.meetingCard}>
                            <Image source={{ uri: item.image }} style={styles.avatar} />

                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.meetingTitle}>{item.title}</Text>
                                <Text style={styles.meetingName}>{item.name}</Text>
                                <Text style={styles.meetingTime}>{item.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
