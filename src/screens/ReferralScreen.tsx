import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/ReferralScreenStyle';
import SafeAreaWrapper from './SafeAreaWrapper';
import { getGivenReferrals, getReceivedReferrals, getConvertedReferrals, convertReferral } from '../services/authApi';
import { LinearGradient } from 'react-native-linear-gradient';
import { Modal } from 'react-native';

const ReferralScreen = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState<'given' | 'received' | 'converted'>('given');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedReferralId, setSelectedReferralId] = useState<number | null>(null);

    const [convertForm, setConvertForm] = useState({
        amount: '',
        note: '',
    });

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
            } else if (activeTab === 'received') {
                res = await getReceivedReferrals(userId);
            } else if (activeTab === 'converted') {
                res = await getConvertedReferrals(userId);
            }

            if (res?.my_referrals || res?.converted_referrals) {
                setData(res.my_referrals || res.converted_referrals);
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

    const handleConvert = async () => {
        try {

            if (!convertForm.amount || !convertForm.note) {
                Alert.alert('Error', 'Please fill all required fields');
                return;
            }

            const payload = {
                amount: convertForm.amount,
                note: convertForm.note,
            };

            await convertReferral(selectedReferralId, payload);

            Alert.alert('Success', 'Referral converted to business successfully');

            setShowModal(false);

            setConvertForm({
                amount: '',
                note: '',
            });

            fetchData();

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Conversion Failed');
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

                        <TouchableOpacity onPress={() => setActiveTab('converted')}>
                            <Text style={[
                                styles.tabText,
                                activeTab === 'converted' && styles.activeTab
                            ]}>
                                Converted
                            </Text>
                            {activeTab === 'converted' && <View style={styles.underline} />}
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
                                    <Text style={styles.type}>
                                        <Text style={styles.labelBold}>Details : </Text>
                                        {item.referral}
                                    </Text>

                                    {/* 🔷 CONVERTED TAB EXTRA DATA */}
                                    {activeTab === 'converted' && (
                                        <View>
                                            <Text style={styles.type}>
                                                <Text style={styles.labelBold}>Amount : </Text>
                                                ₹ {item.amount}
                                            </Text>
                                            <Text style={styles.type}>
                                                <Text style={styles.labelBold}>Note : </Text>
                                                {item.note}
                                            </Text>
                                            <Text style={styles.type}>
                                                <Text style={styles.labelBold}>Converted At : </Text>
                                                {new Date(item.converted_at).toLocaleString('en-IN')}
                                            </Text>
                                        </View>
                                    )}

                                    {/* 🔷 RECEIVED TAB BUTTON */}
                                    {activeTab === 'received' && (
                                        <TouchableOpacity
                                            style={styles.convertBtn}
                                            onPress={() => {
                                                setSelectedReferralId(item.id);
                                                setShowModal(true);
                                            }}
                                        >
                                            <Text style={styles.convertBtnText}>
                                                Convert To Business
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))
                        )}
                    </ScrollView>
                </ScrollView>
            </View>

            {/* 🔷 CONVERT MODAL */}
            <Modal
                visible={showModal}
                transparent
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>
                            Convert Referral to Business
                        </Text>
                        <TextInput
                            placeholder="Enter Business Amount*"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={convertForm.amount}
                            onChangeText={(v) =>
                                setConvertForm({
                                    ...convertForm,
                                    amount: v
                                })
                            }
                            style={styles.modalInput}
                        />
                        <TextInput
                            placeholder="Enter details about the business conversion (note)*"
                            placeholderTextColor="#999"
                            multiline
                            value={convertForm.note}
                            onChangeText={(v) =>
                                setConvertForm({
                                    ...convertForm,
                                    note: v
                                })
                            }
                            style={[
                                styles.modalInput,
                                { height: 100, textAlignVertical: 'top' }
                            ]}
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15,
                        }}>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={{ color: '#000' }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={handleConvert}
                            >
                                <Text style={{ color: '#fff' }}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaWrapper>
    );
};

export default ReferralScreen;