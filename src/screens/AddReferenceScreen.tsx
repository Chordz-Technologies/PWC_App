import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/AddReferenceScreenStyle';
import { addReferral, getAllMembers } from '../services/authApi';

const AddReferenceScreen = ({ navigation }: any) => {
    const [showDate, setShowDate] = useState(false);
    const [members, setMembers] = useState<any[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState('');
    const [form, setForm] = useState({
        ref_date: '',
        referral_from: '',   // name (auto)
        referral_to: '',     // name
        referral: '',
        ref_type: '',
        comment: '',
        address: '',
        ref_from: Number(null),
        ref_to: Number(null),
    });

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    useEffect(() => {
        loadUser();
        fetchMembers();
    }, []);

    // ✅ Get logged-in user
    const loadUser = async () => {
        const id = await AsyncStorage.getItem('userId');
        const name = await AsyncStorage.getItem('userName');

        if (id && name) {
            const numericId = Number(id); // ✅ convert here

            setUserId(numericId);
            setUserName(name);

            setForm(prev => ({
                ...prev,
                referral_from: name,
                ref_from: numericId, // ✅ number
            }));
        }
    };

    // ✅ Fetch members for dropdown
    const fetchMembers = async () => {
        try {
            const res = await getAllMembers();

            const formatted = res.all_members.map((item: any) => ({
                label: item.name,
                value: item.id,
            }));

            setMembers(formatted);

        } catch (error) {
            console.log('Members API error', error);
        }
    };

    const referralTypes = [
        { label: 'Self Referral', value: 'Self Referral' },
        { label: 'Outside', value: 'Outside' },
    ];

    const handleSubmit = async () => {
        try {
            if (!form.ref_date || !form.referral_from || !form.referral_to || !form.referral || !form.ref_type) {
                Alert.alert('Error', 'Please fill required fields');
                return;
            }

            const payload = {
                ref_date: form.ref_date,
                referral_from: form.referral_from,
                referral_to: form.referral_to,
                referral: form.referral,
                ref_type: form.ref_type,
                comment: form.comment,
                address: form.address,
                ref_from: Number(form.ref_from),
                ref_to: Number(form.ref_to),
            };

            const res = await addReferral(payload);

            Alert.alert('Success', 'Reference Added');

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });

        } catch (err) {
            Alert.alert('Error', 'Failed to add reference');
        }
    };

    return (
        <View style={styles.container}>

            {/* 🔷 HEADER */}
            <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Add Reference</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={{ padding: 15 }}>

                {/* DATE */}
                <Text style={styles.label}>Reference Date*</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDate(true)}
                >
                    <Text style={{ color: form.ref_date ? '#000' : '#999' }}>
                        {form.ref_date || 'Select Date'}
                    </Text>
                </TouchableOpacity>

                {showDate && (
                    <DateTimePicker
                        mode="date"
                        display="calendar"
                        value={new Date()}
                        onChange={(event, date) => {
                            setShowDate(false);
                            if (date) {
                                const formatted = date.toISOString().split('T')[0];
                                handleChange('ref_date', formatted);
                            }
                        }}
                    />
                )}

                {/* ✅ REFERRAL FROM (AUTO - DISABLED) */}
                <Text style={styles.label}>Referral From*</Text>
                <TextInput
                    value={userName}
                    style={[styles.input, { color: '#000000' }]}
                />

                {/* ✅ REFERRAL TO (DROPDOWN) */}
                <Text style={styles.label}>Referral To*</Text>
                <Dropdown
                    style={styles.input}
                    data={members}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Member"
                    placeholderStyle={{ color: '#999' }}
                    value={form.ref_to}
                    onChange={(item) => {
                        setForm(prev => ({
                            ...prev,
                            ref_to: Number(item.value),   // ✅ FORCE NUMBER
                            referral_to: item.label
                        }));
                    }}
                />

                {/* REFERRAL */}
                <Text style={styles.label}>Referral*</Text>
                <TextInput
                    placeholder="Enter Referral Details"
                    placeholderTextColor="#999"
                    style={styles.input}
                    onChangeText={(v) => handleChange('referral', v)}
                />

                {/* REF TYPE */}
                <Text style={styles.label}>Reference Type*</Text>

                <Dropdown
                    style={styles.input}
                    data={referralTypes}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Reference Type"
                    placeholderStyle={{ color: '#999' }}
                    value={form.ref_type}
                    onChange={(item) => handleChange('ref_type', item.value)}
                />

                {/* ADDRESS */}
                <Text style={styles.label}>Address</Text>
                <TextInput
                    placeholder="Enter Address"
                    placeholderTextColor="#999"
                    style={[styles.input, { height: 100 }]}
                    multiline
                    textAlignVertical="top"
                    onChangeText={(v) => handleChange('address', v)}
                />

                {/* COMMENT */}
                <Text style={styles.label}>Comment</Text>
                <TextInput
                    placeholder="Enter Comment"
                    placeholderTextColor="#999"
                    style={[styles.input, { height: 100 }]}
                    multiline
                    textAlignVertical="top"
                    onChangeText={(v) => handleChange('comment', v)}
                />

                {/* SUBMIT */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Add Reference</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default AddReferenceScreen;
