import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/EventRegisterScreenStyle';
import SafeAreaWrapper from './SafeAreaWrapper';
import { registerForEvent, getMemberDetails, } from '../services/authApi';

const EventRegisterScreen = ({ navigation, route }: any) => {
    const { eventId } = route.params;
    const [loading, setLoading] = useState(false);
    const [memberLoading, setMemberLoading] = useState(true);
    const [paymentDone, setPaymentDone] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        business_category: '',
        address: '',
    });

    useEffect(() => {
        loadMemberDetails();
    }, []);

    const loadMemberDetails = async () => {
        try {
            setMemberLoading(true);
            const memberId = await AsyncStorage.getItem('userId');

            if (!memberId) {
                Alert.alert('Error', 'Member ID not found. Please login again.');
                return;
            }

            const response = await getMemberDetails(memberId);

            const member = response?.member_details;

            setForm({
                name: member?.name || '',
                phone: member?.phone || member?.mobile || '',
                email: member?.email || member?.email_id || '',
                business_category: member?.business_category || '',
                address: member?.office_address || '',
            });

        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Unable to fetch member details.',);
        } finally {
            setMemberLoading(false);
        }
    };

    const handleChange = (key: string, value: string,) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handlePayment = async () => {
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setPaymentDone(true);
                Alert.alert('Payment', 'Payment completed successfully.',);
            }, 1000);
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Unable to process payment.',);
        }
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.phone) {
            Alert.alert('Error', 'Please fill all required fields.',);
            return;
        }

        if (!paymentDone) {
            Alert.alert('Payment Required', 'Please complete payment before registering.',);
            return;
        }

        try {
            setLoading(true);
            const memberId = await AsyncStorage.getItem('userId');
            if (!memberId) {
                Alert.alert('Error', 'Member ID not found. Please login again.',);
                return;
            }

            const payload = {
                ...form,
                event: eventId,
                member: Number(memberId),
            };

            const response = await registerForEvent(payload);

            Alert.alert('Success', 'Event Registration Successful',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.goBack();
                        },
                    },
                ],
            );
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Failed to register for event.',);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Event Registration
                    </Text>
                </LinearGradient>


                {memberLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <ActivityIndicator size="large" color="#4361ee" />
                        <Text style={{ marginTop: 10, color: '#666', }}>
                            Loading member details...
                        </Text>
                    </View>
                ) : (
                    <ScrollView
                        contentContainerStyle={{
                            padding: 15,
                            paddingBottom: 40,
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* FULL NAME */}
                        <Text style={styles.label}>
                            Full Name*
                        </Text>

                        <TextInput
                            placeholder="Enter Full Name"
                            placeholderTextColor="#8d99ae"
                            style={styles.input}
                            value={form.name}
                            onChangeText={(v) =>
                                handleChange('name', v)
                            }
                        />

                        {/* PHONE */}
                        <Text style={styles.label}>
                            Mobile Number*
                        </Text>

                        <TextInput
                            placeholder="Enter Mobile Number"
                            placeholderTextColor="#8d99ae"
                            keyboardType="phone-pad"
                            maxLength={10}
                            style={styles.input}
                            value={form.phone}
                            onChangeText={(v) =>
                                handleChange('phone', v)
                            }
                        />

                        {/* EMAIL */}
                        <Text style={styles.label}>
                            Email Address*
                        </Text>

                        <TextInput
                            placeholder="Enter Email"
                            placeholderTextColor="#8d99ae"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                            value={form.email}
                            onChangeText={(v) =>
                                handleChange('email', v)
                            }
                        />

                        {/* BUSINESS CATEGORY */}
                        <Text style={styles.label}>
                            Business Category
                        </Text>

                        <TextInput
                            placeholder="Enter Business Category"
                            placeholderTextColor="#8d99ae"
                            style={styles.input}
                            value={form.business_category}
                            onChangeText={(v) =>
                                handleChange(
                                    'business_category',
                                    v,
                                )
                            }
                        />

                        {/* ADDRESS */}
                        <Text style={styles.label}>
                            Address
                        </Text>

                        <TextInput
                            placeholder="Enter Address"
                            placeholderTextColor="#8d99ae"
                            style={[
                                styles.input,
                                {
                                    height: 100,
                                },
                            ]}
                            multiline
                            textAlignVertical="top"
                            value={form.address}
                            onChangeText={(v) =>
                                handleChange(
                                    'address',
                                    v,
                                )
                            }
                        />

                        {/* PAYMENT BUTTON */}
                        {!paymentDone && (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handlePayment}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <Icon
                                            name="card-outline"
                                            size={20}
                                            color="#fff"
                                        />
                                        <Text style={styles.btnText}>
                                            Pay Now
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        )}

                        {/* PAYMENT COMPLETED */}
                        {paymentDone && (
                            <>
                                <View
                                    style={{
                                        marginTop: 15,
                                        padding: 12,
                                        borderRadius: 8,
                                        backgroundColor: '#ecfdf5',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        name="checkmark-circle"
                                        size={22}
                                        color="#10b981"
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 8,
                                            color: '#059669',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Payment completed
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        {
                                            marginTop: 15,
                                            backgroundColor: '#10b981',
                                        },
                                    ]}
                                    onPress={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.btnText}>
                                            I Have Completed Payment
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </>
                        )}
                    </ScrollView>
                )}
            </View>
        </SafeAreaWrapper>
    );
};

export default EventRegisterScreen;