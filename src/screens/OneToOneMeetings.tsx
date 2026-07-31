import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/ReferralScreenStyle';
import SafeAreaWrapper from './SafeAreaWrapper';
import { getMyMeetings, getOtherMeetings } from '../services/authApi';
import { LinearGradient } from 'react-native-linear-gradient';

const OneToOneMeetings = ({ navigation }: any) => {
    const [selectedTab, setSelectedTab] = useState<'self' | 'other'>('self');
    const [meetings, setMeetings] = useState<any[]>([]);
    const [filteredMeetings, setFilteredMeetings] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const name = await AsyncStorage.getItem('userName');

        if (name) {
            setUserName(name);
            fetchSelfMeetings(name);
        }
    };

    const fetchSelfMeetings = async (person1: string) => {
        try {
            setLoading(true);
            const res = await getMyMeetings(person1);
            if (res?.person1_meetings) {
                setMeetings(res.person1_meetings);
                setFilteredMeetings(res.person1_meetings);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchOtherMeetings = async (person2: string) => {
        try {
            setLoading(true);
            const res = await getOtherMeetings(person2);
            if (res?.person2_meetings) {
                setMeetings(res.person2_meetings);
                setFilteredMeetings(res.person2_meetings);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const changeTab = (tab: 'self' | 'other') => {
        setSelectedTab(tab);
        setSearch('');

        if (tab === 'self') {
            fetchSelfMeetings(userName);
        } else {
            fetchOtherMeetings(userName);
        }
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-IN', {
            day: '2-digit',
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

    const handleSearch = (text: string) => {
        setSearch(text);
        const filtered = meetings.filter((item: any) => {
            const person =
                selectedTab === 'self'
                    ? item.person2
                    : item.person1;

            return person
                ?.toLowerCase()
                .includes(text.toLowerCase());
        });
        setFilteredMeetings(filtered);
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>One To One Meetings</Text>
                </LinearGradient>

                {/* 🔷 TAB HEADER */}
                <ScrollView contentContainerStyle={{ padding: 15 }}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={() => changeTab('self')}>
                            <Text style={[
                                styles.tabText,
                                selectedTab === 'self' && styles.activeTab
                            ]}>
                                Self
                            </Text>
                            {selectedTab === 'self' && <View style={styles.underline} />}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => changeTab('other')}>
                            <Text style={[
                                styles.tabText,
                                selectedTab === 'other' && styles.activeTab
                            ]}>
                                Other
                            </Text>
                            {selectedTab === 'other' && <View style={styles.underline} />}
                        </TouchableOpacity>
                    </View>

                    {/* 🔍 SEARCH */}
                    <View style={styles.searchBox}>
                        <Icon name="search" size={18} color="#888" />
                        <TextInput
                            placeholder="Search Member"
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                            value={search}
                            onChangeText={handleSearch}
                        />
                    </View>

                    {/* 🔷 LIST */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#4361ee" style={{ marginTop: 20 }} />
                        ) : filteredMeetings.length === 0 ? (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>
                                No Data Found
                            </Text>
                        ) : (
                            filteredMeetings.map((item) => (
                                <View key={item.id} style={styles.card}>

                                    <View style={styles.rowBetween}>
                                        <Text style={styles.name}>
                                            {selectedTab === 'self'
                                                ? item.person2
                                                : item.person1}
                                        </Text>

                                        <Text style={styles.date}>
                                            {formatDate(item.date)}
                                        </Text>
                                    </View>

                                    <Text style={styles.label}>
                                        <Text style={styles.labelBold}>
                                            Venue :
                                        </Text>{' '}
                                        {item.venue}
                                    </Text>

                                    <Text style={styles.label}>
                                        <Text style={styles.labelBold}>
                                            Time :
                                        </Text>{' '}
                                        {formatTime(item.time)}
                                    </Text>

                                    <Text style={styles.label}>
                                        <Text style={styles.labelBold}>
                                            Title :
                                        </Text>{' '}
                                        {item.title}
                                    </Text>

                                    <Text style={styles.label}>
                                        <Text style={styles.labelBold}>
                                            Description :
                                        </Text>{' '}
                                        {item.description}
                                    </Text>
                                </View>
                            ))
                        )}
                    </ScrollView>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default OneToOneMeetings;