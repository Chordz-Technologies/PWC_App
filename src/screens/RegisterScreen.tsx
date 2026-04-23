import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../styles/RegisterScreenStyle';
import DateTimePicker from '@react-native-community/datetimepicker';

import { registerUser, getAllChapters } from '../services/authApi';

const RegisterScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [chapters, setChapters] = useState([]);
    const [showPicker, setShowPicker] = useState<null | 'dob' | 'joining' | 'expiry'>(null);

    const [dates, setDates] = useState({
        dob: new Date(),
        joining: new Date(),
        expiry: new Date(),
    });

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        pan_no: '',
        gst_no: '',
        joining_date: '',
        expiry_date: '',
        subscription_status: '',
        office_address: '',
        org_name: '',
        facebook: '',
        linkedin: '',
        social_media: '',
        personal_website: '',
        business_category: '',
        role: '',
        dob: '',
        chapter: '',
    });

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const roles = [
        { label: 'MEMBER', value: 'MEMBER' },
        { label: 'VISITOR', value: 'VISITOR' },
    ];

    useEffect(() => {
        fetchChapters();
    }, []);

    const fetchChapters = async () => {
        try {
            const res = await getAllChapters();

            const formatted = res.all_chapters.map((item: any) => ({
                label: item.chapterName,
                value: item.chapterName,
            }));

            setChapters(formatted);
        } catch (error) {
            console.log('Chapter API error', error);
        }
    }

    const handleRegister = async () => {
        if (!form.name || !form.email || !form.password) {
            Alert.alert('Error', 'Name, Email and Password are required');
            return;
        }

        try {
            setLoading(true);

            const payload = {
                ...form,
                chapter: form.chapter,   // now sending chapterName
            };

            const response = await registerUser(payload);

            setLoading(false);

            if (response?.success || response?.message) {
                Alert.alert('Success', 'Registration Successful');
                navigation.replace('Login');
            } else {
                Alert.alert('Error', 'Registration Failed');
            }

        } catch (error: any) {
            setLoading(false);
            Alert.alert('Error', error?.message || 'Something went wrong');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.container}>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={styles.card}>
                    <Text style={styles.title}>Create Account</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        {/* 🔹 BASIC */}
                        <View style={styles.inputContainer}>
                            <Icon name="person-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="Full Name*" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('name', v)} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="mail-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="Email Address*" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('email', v)} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="call-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="Mobile Number*" placeholderTextColor="#8d99ae" keyboardType="numeric" style={styles.input} onChangeText={(v) => handleChange('phone', v)} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="lock-closed-outline" size={20} color="#8d99ae" />
                            <TextInput
                                placeholder="Password*"
                                secureTextEntry={secureText}
                                placeholderTextColor="#8d99ae"
                                style={styles.input}
                                onChangeText={(v) => handleChange('password', v)}
                            />
                            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                                <Icon name={secureText ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8d99ae" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="calendar-outline" size={20} color="#8d99ae" />

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => setShowPicker('dob')}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.input,
                                        { color: form.dob ? '#2b2d42' : '#8d99ae' }
                                    ]}
                                >
                                    {form.dob || 'Date of Birth'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {showPicker && (
                            <DateTimePicker
                                value={
                                    showPicker === 'dob'
                                        ? dates.dob
                                        : showPicker === 'joining'
                                            ? dates.joining
                                            : dates.expiry
                                }
                                mode="date"
                                display="calendar"
                                maximumDate={showPicker === 'dob' ? new Date() : undefined}
                                onChange={(event, selectedDate) => {
                                    setShowPicker(null);

                                    if (selectedDate) {
                                        const formatted = selectedDate.toISOString().split('T')[0];

                                        if (showPicker === 'dob') {
                                            setDates({ ...dates, dob: selectedDate });
                                            handleChange('dob', formatted);
                                        }
                                        if (showPicker === 'joining') {
                                            setDates({ ...dates, joining: selectedDate });
                                            handleChange('joining_date', formatted);
                                        }
                                        if (showPicker === 'expiry') {
                                            setDates({ ...dates, expiry: selectedDate });
                                            handleChange('expiry_date', formatted);
                                        }
                                    }
                                }}
                            />
                        )}

                        {/* 🔹 BUSINESS */}
                        <View style={styles.inputContainer}>
                            <Icon name="id-card-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="PAN Number" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('pan_no', v)} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="briefcase-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="GST Number" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('gst_no', v)} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="business-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="Organization Name" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('org_name', v)} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="layers-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="Business Category" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('business_category', v)} />
                        </View>

                        {/* 🔹 DATES */}
                        <View style={styles.inputContainer}>
                            <Icon name="calendar-outline" size={20} color="#8d99ae" />

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => setShowPicker('joining')}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.input,
                                        { color: form.joining_date ? '#2b2d42' : '#8d99ae' }
                                    ]}
                                >
                                    {form.joining_date || 'Joining Date'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="calendar-outline" size={20} color="#8d99ae" />
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => setShowPicker('expiry')}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.input,
                                        { color: form.expiry_date ? '#2b2d42' : '#8d99ae' }
                                    ]}
                                >
                                    {form.expiry_date || 'Expiry Date'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* 🔹 OTHER */}
                        <View style={styles.inputContainer}>
                            <Icon name="checkmark-done-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="Subscription Status" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('subscription_status', v)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="location-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="Office Address" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('office_address', v)} />
                        </View>

                        {/* 🔹 SOCIAL */}
                        <View style={styles.inputContainer}>
                            <Icon name="logo-facebook" size={20} color="#8d99ae" />
                            <TextInput placeholder="Facebook Profile" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('facebook', v)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="logo-linkedin" size={20} color="#8d99ae" />
                            <TextInput placeholder="LinkedIn Profile" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('linkedin', v)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="logo-twitter" size={20} color="#8d99ae" />
                            <TextInput placeholder="Other Social Media" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('social_media', v)} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="globe-outline" size={20} color="#8d99ae" />
                            <TextInput placeholder="Website URL" placeholderTextColor="#8d99ae" style={styles.input} onChangeText={(v) => handleChange('personal_website', v)} />
                        </View>

                        {/* 🔹 DROPDOWNS */}
                        <Dropdown
                            style={styles.dropdown}
                            data={roles}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Role*"
                            placeholderStyle={{ color: '#8d99ae' }}
                            value={form.role}
                            onChange={(item) => handleChange('role', item.value)}
                        />

                        <Dropdown
                            style={styles.dropdown}
                            data={chapters}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Chapter*"
                            placeholderStyle={{ color: '#8d99ae' }}
                            value={form.chapter}
                            onChange={(item) => handleChange('chapter', item.value)}
                            maxHeight={200}
                        />

                        {/* 🔹 BUTTON */}
                        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Register</Text>}
                        </TouchableOpacity>

                        {/* 🔹 LOGIN */}
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>
                                Already have an account? <Text style={styles.linkHighlight}>Login</Text>
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                {/* </ScrollView> */}
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
