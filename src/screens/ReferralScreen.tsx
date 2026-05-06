import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/ReferralScreenStyle';
import SafeAreaWrapper from './SafeAreaWrapper';
import { getGivenReferrals, getReceivedReferrals, } from '../services/authApi';
import { LinearGradient } from 'react-native-linear-gradient';

const ReferralScreen = ({ navigation }: any) => {

    const [activeTab, setActiveTab] = useState<'given' | 'received'>('given');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [activeTab, userId]);

    const loadUser = async () => {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
    };

    const fetchData = async () => {
        try {
            setLoading(true);

            let res;

            if (activeTab === 'given') {
                res = await getGivenReferrals(userId);
            } else {
                res = await getReceivedReferrals(userId);
            }

            if (res?.my_referrals) {
                setData(res.my_referrals);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
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

    const filteredData = data.filter(item =>
        item.referral_to?.toLowerCase().includes(search.toLowerCase()) ||
        item.referral_from?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Referrals</Text>
                </LinearGradient>

                {/* 🔷 TAB HEADER */}
                <ScrollView contentContainerStyle={{ padding: 15 }}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={() => setActiveTab('given')}>
                            <Text style={[
                                styles.tabText,
                                activeTab === 'given' && styles.activeTab
                            ]}>
                                Given
                            </Text>
                            {activeTab === 'given' && <View style={styles.underline} />}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setActiveTab('received')}>
                            <Text style={[
                                styles.tabText,
                                activeTab === 'received' && styles.activeTab
                            ]}>
                                Received
                            </Text>
                            {activeTab === 'received' && <View style={styles.underline} />}
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
                            onChangeText={setSearch}
                        />
                    </View>

                    {/* 🔷 LIST */}
                    <ScrollView showsVerticalScrollIndicator={false}>

                        {loading ? (
                            <ActivityIndicator size="large" color="#4361ee" style={{ marginTop: 20 }} />
                        ) : filteredData.length === 0 ? (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>
                                No Data Found
                            </Text>
                        ) : (
                            filteredData.map((item) => (
                                <View key={item.id} style={styles.card}>

                                    <View style={styles.rowBetween}>
                                        <Text style={styles.name}>
                                            {activeTab === 'given'
                                                ? item.referral_to
                                                : item.referral_from}
                                        </Text>

                                        <Text style={styles.date}>
                                            {formatDate(item.ref_date)}
                                        </Text>
                                    </View>

                                    <Text style={styles.location}>
                                        📍 {item.address}
                                    </Text>

                                    <Text style={styles.label}>
                                        <Text style={styles.labelBold}>Contact Name : </Text>
                                        {item.referral_from}
                                    </Text>

                                    <Text style={styles.type}>
                                        <Text style={styles.labelBold}>Type : </Text>
                                        {item.ref_type}
                                    </Text>

                                    <Text style={styles.company}>
                                        <Text style={styles.labelBold}>Details : </Text>
                                        {item.referral}
                                    </Text>

                                    {/* <Text style={styles.newTag}>New</Text> */}
                                </View>
                            ))
                        )}
                    </ScrollView>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default ReferralScreen;