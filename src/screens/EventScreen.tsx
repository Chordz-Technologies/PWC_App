import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/EventScreenStyle';
import { getAllEvents } from '../services/authApi';
import SafeAreaWrapper from './SafeAreaWrapper';

const EventScreen = ({ navigation }: any) => {

    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await getAllEvents();

            if (res?.all_events) {
                setEvents(res.all_events);
            }
        } catch (error) {
            console.log('Events API Error', error);
        } finally {
            setLoading(false);
        }
    };

    // 📅 format date + time
    const formatDateTime = (date: string, time: string) => {
        const d = new Date(`${date}T${time}`);

        const formattedDate = d.toLocaleDateString('en-IN', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

        const formattedTime = d.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return { formattedDate, formattedTime };
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Events</Text>
                </LinearGradient>

                <ScrollView contentContainerStyle={{ padding: 15 }}>

                    {loading ? (
                        <ActivityIndicator size="large" color="#4361ee" />
                    ) : events.length === 0 ? (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>
                            No Events Found
                        </Text>
                    ) : (
                        events.map((item) => {
                            const { formattedDate, formattedTime } =
                                formatDateTime(item.event_date, item.event_time);

                            return (
                                <View key={item.id} style={styles.eventCard}>

                                    {/* 🔹 TITLE */}
                                    <Text style={styles.eventTitle}>
                                        {item.title}
                                    </Text>

                                    {/* 🔹 DATE */}
                                    <View style={styles.row}>
                                        <Icon name="calendar-outline" size={16} color="#666" />
                                        <Text style={styles.eventText}>
                                            {formattedDate}
                                        </Text>
                                    </View>

                                    {/* 🔹 TIME */}
                                    <View style={styles.row}>
                                        <Icon name="time-outline" size={16} color="#666" />
                                        <Text style={styles.eventText}>
                                            {formattedTime}
                                        </Text>
                                    </View>

                                    {/* 🔹 VENUE */}
                                    <View style={styles.row}>
                                        <Icon name="location-outline" size={16} color="#666" />
                                        <Text style={styles.eventText}>
                                            {item.venue}
                                        </Text>
                                    </View>

                                    {/* 🔹 PRICE */}
                                    <View style={styles.row}>
                                        <Icon name="cash-outline" size={16} color="#666" />
                                        <Text style={styles.eventText}>
                                            {item.price}
                                        </Text>
                                    </View>

                                    {/* 🔹 ORGANIZER */}
                                    <View style={styles.row}>
                                        <Icon name="people-outline" size={16} color="#666" />
                                        <Text style={styles.eventText}>
                                            {item.organizer}
                                        </Text>
                                    </View>

                                    {/* 🔹 ENTRY INFO */}
                                    <Text style={styles.entryText}>
                                        Max Participants: {item.max_participants}
                                    </Text>

                                    {/* 🔹 BUTTON */}
                                    <TouchableOpacity style={styles.button}
                                        onPress={() => navigation.navigate('EventRegister', { eventId: item.id })}>
                                        <Text style={styles.btnText}>Register Now</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default EventScreen;
