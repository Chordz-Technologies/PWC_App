import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking, FlatList, ActivityIndicator, ScrollView, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/RegularMeetingsScreenStyle';
import { getAllChapterMeetings } from '../services/authApi';

const RegularMeetingsScreen = ({ navigation, route }: any) => {
    const [meetings, setMeetings] = useState([]);
    const [filteredMeetings, setFilteredMeetings] = useState([]);
    // const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {

            const res = await getAllChapterMeetings();

            if (res?.all_chapter_meet) {
                setMeetings(res.all_chapter_meet);
                setFilteredMeetings(res.all_chapter_meet);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // const handleSearch = (text: string) => {
    //     setSearch(text);
    //     const filtered = meetings.filter((item: any) =>
    //         item.title
    //             ?.toLowerCase()
    //             .includes(text.toLowerCase())
    //     );

    //     setFilteredMeetings(filtered);
    // };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(
            'en-IN',
            {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            },
        );
    };

    const formatTime = (time: string) => {

        return new Date(
            `1970-01-01T${time}`,
        ).toLocaleTimeString(
            'en-IN',
            {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            },
        );
    };

    const openRazorpayLink = async () => {
        const url = 'https://razorpay.me/@punewomensclub';

        try {
            await Linking.openURL(url);
        } catch (error) {
            Alert.alert(
                'Error',
                'Unable to open payment page.'
            );
        }
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* Header */}
                <LinearGradient
                    colors={['#4361ee', '#3f37c9']}
                    style={styles.header}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-back"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Regular Meetings
                    </Text>
                </LinearGradient>

                {/* Search */}
                {/* <View style={styles.searchBox}>
                    <Icon name="search" size={18} color="#888" />
                    <TextInput
                        placeholder="Search Member"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View> */}


                {loading ? (
                    <ActivityIndicator size="large" color="#4361ee" style={{ marginTop: 20 }} />
                ) : filteredMeetings.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        No Data Found
                    </Text>
                ) : (
                    <FlatList
                        data={filteredMeetings}
                        keyExtractor={(item: any) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 15,
                            paddingBottom: 30,
                        }}
                        ListEmptyComponent={() => (
                            <Text
                                style={{
                                    textAlign: 'center',
                                    marginTop: 40,
                                    fontSize: 16,
                                    color: '#666',
                                }}
                            >
                                No Meetings Found
                            </Text>
                        )}
                        renderItem={({ item }: any) => (
                            <View style={styles.card}>

                                {/* Title & Fees */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>

                                    <Text style={styles.fees}>
                                        ₹ {item.fees}
                                    </Text>
                                </View>

                                {/* Date */}
                                <View style={styles.infoRow}>
                                    <Icon
                                        name="calendar-outline"
                                        size={17}
                                        color="#666"
                                    />

                                    <Text style={styles.infoText}>
                                        {formatDate(item.date)}
                                    </Text>
                                </View>

                                {/* Time */}
                                <View style={styles.infoRow}>
                                    <Icon
                                        name="time-outline"
                                        size={17}
                                        color="#666"
                                    />

                                    <Text style={styles.infoText}>
                                        {formatTime(item.start_time)} - {formatTime(item.end_time)}
                                    </Text>
                                </View>

                                {/* Venue */}
                                <View style={styles.infoRow}>
                                    <Icon
                                        name="location-outline"
                                        size={17}
                                        color="#666"
                                    />

                                    <Text style={styles.infoText}>
                                        {item.venue}
                                    </Text>
                                </View>

                                {/* Buttons */}
                                <View style={styles.buttonRow}>

                                    <TouchableOpacity
                                        style={styles.addVisitorButton}
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

                                        <Text style={styles.buttonText}>
                                            Add Visitor
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.enrollButton}
                                        onPress={openRazorpayLink}
                                    >
                                        <Icon
                                            name="checkmark-circle-outline"
                                            size={16}
                                            color="#fff"
                                        />

                                        <Text style={styles.buttonText}>
                                            Enroll Now
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaWrapper>
    );
};

export default RegularMeetingsScreen;

