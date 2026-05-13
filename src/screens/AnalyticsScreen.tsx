import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/AnalyticsScreenStyle';
import { getDashboardAnalytics } from '../services/authApi';

const AnalyticsScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'home' | 'global'>('home');
    const [dashboard, setDashboard] = useState<any>(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const memberId = await AsyncStorage.getItem('userId');
            const res = await getDashboardAnalytics(memberId);
            setDashboard(res);
        } catch (error) {
            console.log('Dashboard Error', error);
        } finally {
            setLoading(false);
        }
    };

    const analyticsData =
        activeTab === 'home'
            ? [
                {
                    title: 'Total Members',
                    value: dashboard?.Total_Members || 0,
                    icon: 'people',
                    bg: '#dceeff',
                    iconBg: '#2196f3',
                },
                {
                    title: 'My Referrals Given',
                    value: dashboard?.My_Referrals?.Given || 0,
                    icon: 'arrow-up',
                    bg: '#ffe3e8',
                    iconBg: '#f44336',
                },
                {
                    title: 'My Referrals Received',
                    value: dashboard?.My_Referrals?.Received || 0,
                    icon: 'arrow-down',
                    bg: '#e7f8e7',
                    iconBg: '#4caf50',
                },
                {
                    title: 'My Referrals Converted',
                    value: dashboard?.My_Referrals?.Converted || 0,
                    icon: 'checkmark-done',
                    bg: '#f7e3c6',
                    iconBg: 'orange',
                },
                {
                    title: 'My Converted Business',
                    value: `₹ ${dashboard?.My_Referrals?.Business || 0}/-`,
                    icon: 'logo-usd',
                    bg: '#f3dfff',
                    iconBg: '#9c27b0',
                },
            ]
            : [
                {
                    title: 'Total Members',
                    value: dashboard?.Total_Members || 0,
                    icon: 'people',
                    bg: '#dceeff',
                    iconBg: '#2196f3',
                },
                {
                    title: 'Total Referrals Given',
                    value: dashboard?.Overall_Referrals?.Total_Given || 0,
                    icon: 'arrow-up',
                    bg: '#ffe3e8',
                    iconBg: '#f44336',
                },
                {
                    title: 'Total Referrals Received',
                    value: dashboard?.Overall_Referrals?.Total_Received || 0,
                    icon: 'arrow-down',
                    bg: '#e7f8e7',
                    iconBg: '#4caf50',
                },
                {
                    title: 'Total Referrals Converted',
                    value: dashboard?.Overall_Referrals?.Total_Converted || 0,
                    icon: 'checkmark-done',
                    bg: '#f7e3c6',
                    iconBg: 'orange',
                },
                {
                    title: 'Total Converted Business',
                    value: `₹ ${dashboard?.Overall_Referrals?.Total_Business || 0}/-`,
                    icon: 'logo-usd',
                    bg: '#f3dfff',
                    iconBg: '#9c27b0',
                },
            ];

    if (loading) {
        return (
            <SafeAreaWrapper>
                <View style={styles.loaderContainer}>
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Analytics</Text>
                </LinearGradient>

                {/* 🔷 TABS */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => setActiveTab('home')}>
                        <Text style={[
                            styles.tabText,
                            activeTab === 'home' && styles.activeTab
                        ]}>
                            Home
                        </Text>
                        {activeTab === 'home' && <View style={styles.underline} />}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setActiveTab('global')}>
                        <Text style={[
                            styles.tabText,
                            activeTab === 'global' && styles.activeTab
                        ]}>
                            Global
                        </Text>
                        {activeTab === 'global' && <View style={styles.underline} />}
                    </TouchableOpacity>
                </View>

                {/* 🔷 CARDS */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 15,
                        paddingBottom: 30,
                    }}
                >
                    {analyticsData.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.card,
                                { backgroundColor: item.bg },
                            ]}
                        >
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: item.iconBg },
                                ]}
                            >
                                <Icon
                                    name={item.icon}
                                    size={24}
                                    color="#fff"
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={styles.cardTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.cardValue}>
                                    {item.value}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaWrapper >
    );
};

export default AnalyticsScreen;