import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { styles } from '../styles/EventRegisterScreenStyle';
import SafeAreaWrapper from './SafeAreaWrapper';
import { getMemberDetails, createEventPayment, verifyEventPayment, registerForEvent, } from '../services/authApi';

const EventRegisterScreen = ({ navigation, route }: any) => {
    const { eventId } = route.params;
    const [loading, setLoading] = useState(false);
    const [memberLoading, setMemberLoading] = useState(true);
    const [paymentDone, setPaymentDone] = useState(false);
    const [memberId, setMemberId] = useState<string>('');
    const [razorpayOrderId, setRazorpayOrderId] = useState('');
    const [razorpayPaymentId, setRazorpayPaymentId] = useState('');
    const [razorpaySignature, setRazorpaySignature] = useState('');
    const [razorpayKey, setRazorpayKey] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        business_category: '',
        address: '',
    });
    const [visitors, setVisitors] = useState<any[]>([]);

    useEffect(() => {
        loadMemberDetails();
    }, []);

    const loadMemberDetails = async () => {
        try {
            setMemberLoading(true);
            const storedMemberId = await AsyncStorage.getItem('userId');
            if (!storedMemberId) {
                Alert.alert('Error', 'Member ID not found. Please login again.');
                return;
            }
            setMemberId(storedMemberId);
            const response = await getMemberDetails(storedMemberId);
            const member = response?.member_details;

            setForm({
                name: member?.name || '',
                phone: member?.phone || member?.mobile || '',
                email: member?.email || member?.email_id || '',
                business_category: member?.business_category || '',
                address: member?.office_address || '',
            });
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Unable to fetch member details.');
        } finally {
            setMemberLoading(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const addVisitor = () => {
        if (visitors.length >= 5) {
            Alert.alert('Limit Reached', 'Maximum 5 visitors can be added.');
            return;
        }

        setVisitors(prev => [
            ...prev,
            {
                name: '',
                phone: '',
                email: '',
            },
        ]);
    };

    const removeVisitor = (index: number) => {
        setVisitors(prev =>
            prev.filter((_, i) => i !== index)
        );
    };

    const handleVisitorChange = (index: number, key: string, value: string) => {
        setVisitors(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [key]: value,
            };
            return updated;

        });
    };

    const buildAttendees = () => {
        const attendees = [
            {
                name: form.name,
                phone: form.phone,
                email: form.email,
                attendee_type: 'Member',
            },

            ...visitors.map(visitor => ({
                name: visitor.name,
                phone: visitor.phone,
                email: visitor.email,
                attendee_type: 'Visitor',
            })),
        ];
        return attendees;
    };

    const validateForm = () => {
        if (!form.name) {
            Alert.alert('Error', 'Member name is required.');
            return false;
        }

        if (!form.phone) {
            Alert.alert('Error', 'Member phone is required.');
            return false;
        }

        if (!form.email) {
            Alert.alert('Error', 'Member email is required.');
            return false;
        }

        for (let i = 0; i < visitors.length; i++) {
            const visitor = visitors[i];
            if (!visitor.name) {
                Alert.alert('Error', `Please enter visitor ${i + 1} name.`);
                return false;
            }

            if (!visitor.phone) {
                Alert.alert('Error', `Please enter visitor ${i + 1} phone.`);
                return false;
            }

            if (!visitor.email) {
                Alert.alert('Error', `Please enter visitor ${i + 1} email.`);
                return false;
            }
        }
        return true;
    };

    const handlePayment = async () => {
        if (loading) {
            return;
        }

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const storedMemberId = await AsyncStorage.getItem('userId');
            if (!storedMemberId) {
                Alert.alert('Error', 'Member ID not found. Please login again.');
                return;
            }
            const attendees = buildAttendees();
            const paymentPayload = {
                member_id: Number(storedMemberId),
                event_id: Number(eventId),
                name: form.name,
                phone: form.phone,
                email: form.email,
                business_category: form.business_category,
                address: form.address,
                attendees: attendees,
            };

            const orderResponse = await createEventPayment(paymentPayload);

            if (orderResponse?.status !== 'success') {
                Alert.alert('Payment Error', orderResponse?.message || 'Unable to create payment order.');
                return;
            }

            const orderDetails = orderResponse?.order_details || orderResponse?.data?.order_details;
            const orderId = orderDetails?.razorpay_order_id || orderResponse?.data?.razorpay_order_id;
            const key = orderResponse?.razorpay_key || orderResponse?.data?.razorpay_key;

            if (!orderId) {
                Alert.alert('Payment Error', 'Razorpay order ID not received.');
                return;
            }

            if (!key) {
                Alert.alert('Payment Error', 'Razorpay key not received.');
                return;
            }
            setRazorpayOrderId(orderId);
            setRazorpayKey(key);

            const backendAmount = orderResponse?.data?.amount || orderDetails?.amount;
            const amount = Number(backendAmount || 0);

            if (!amount) {
                Alert.alert('Payment Error', 'Payment amount was not received from server.');
                return;
            }
            setTotalAmount(String(amount));

            const options = {
                description: `Event Registration`,
                currency: 'INR',
                key: key,
                amount: amount,
                name: 'Pune Women’s Club',
                order_id: orderId,
                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone,
                },
                theme: {
                    color: '#4361ee',
                },
            };

            const paymentData = await RazorpayCheckout.open(options);
            if (!paymentData?.razorpay_payment_id || !paymentData?.razorpay_signature) {
                Alert.alert('Payment Failed', 'Payment details were not received.');
                return;
            }
            const paymentId = paymentData.razorpay_payment_id;
            const signature = paymentData.razorpay_signature;
            setRazorpayPaymentId(paymentId);
            setRazorpaySignature(signature);

            const verifyPayload = {
                order_id: orderId,
                razorpay_payment_id: paymentId,
                razorpay_signature: signature,
                razorpay_key: key,
            };
            const verifyResponse = await verifyEventPayment(verifyPayload);
            const paymentVerified = verifyResponse?.status === 'success' ||
                verifyResponse?.code === 200 || verifyResponse?.verified === true;

            if (!paymentVerified) {
                Alert.alert('Payment Verification Failed', verifyResponse?.message || 'Payment could not be verified.');
                return;
            }

            setPaymentDone(true);
            Alert.alert('Payment Successful', 'Payment completed successfully.');
        } catch (error: any) {
            if (error?.code === 0 || error?.code === 2) {
                Alert.alert('Payment Cancelled', 'You cancelled the payment.');
            } else {
                Alert.alert('Payment Failed', error?.message || error?.description || 'Unable to complete payment.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!paymentDone) {
            Alert.alert('Payment Required', 'Please complete payment first.');
            return;
        }

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const storedMemberId = await AsyncStorage.getItem('userId');
            if (!storedMemberId) {
                Alert.alert('Error', 'Member ID not found. Please login again.');
                return;
            }
            const attendees = buildAttendees();
            const registrationPayload = {
                member_id: Number(storedMemberId),
                event_id: Number(eventId),
                name: form.name,
                phone: form.phone,
                email: form.email,
                business_category: form.business_category,
                address: form.address,
                attendees: attendees,
                razorpay_order_id: razorpayOrderId,
                razorpay_payment_id: razorpayPaymentId,
                razorpay_signature: razorpaySignature,
                payment_status: 'Success',
                total_amount: totalAmount,
                event: Number(eventId),
                member: Number(storedMemberId),
            };

            const response = await registerForEvent(registrationPayload);

            if (response?.status === 'success' || response?.code === 200 || response?.message) {
                Alert.alert('Success', 'Event registration successful!',
                    [
                        {
                            text: 'OK',
                            onPress: () =>
                                navigation.goBack(),
                        },
                    ]
                );
            } else {
                Alert.alert('Error', response?.message || 'Event registration failed.');
            }
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Failed to register for event.');
        } finally {
            setLoading(false);
        }
    };

    if (memberLoading) {
        return (
            <SafeAreaWrapper>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size="large" color="#4361ee" />
                    <Text style={{ marginTop: 10, }}>
                        Loading member details...
                    </Text>
                </View>
            </SafeAreaWrapper>
        );
    }

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9',]} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        Event Registration
                    </Text>
                </LinearGradient>

                <ScrollView
                    contentContainerStyle={{
                        padding: 15,
                        paddingBottom: 40,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.label}>
                        Full Name*
                    </Text>
                    <TextInput
                        placeholder="Enter Full Name"
                        placeholderTextColor="#8d99ae"
                        style={styles.input}
                        value={form.name}
                        onChangeText={(v) => handleChange('name', v)}
                    />

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
                        onChangeText={(v) => handleChange('phone', v)}
                    />

                    <Text style={styles.label}>
                        Email Address*
                    </Text>
                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#8d99ae"
                        keyboardType="email-address"
                        style={styles.input}
                        value={form.email}
                        onChangeText={(v) => handleChange('email', v)}
                    />

                    <Text style={styles.label}>
                        Business Category
                    </Text>
                    <TextInput
                        placeholder="Enter Business Category"
                        placeholderTextColor="#8d99ae"
                        style={styles.input}
                        value={form.business_category}
                        onChangeText={(v) => handleChange('business_category', v)}
                    />

                    <Text style={styles.label}>
                        Address
                    </Text>
                    <TextInput
                        placeholder="Enter Address"
                        placeholderTextColor="#8d99ae"
                        style={[styles.input, { height: 100, },]}
                        multiline
                        textAlignVertical="top"
                        value={form.address}
                        onChangeText={(v) => handleChange('address', v)}
                    />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                    >
                        <Text style={styles.label}>
                            {/* Visitors */}
                        </Text>

                        {visitors && (
                            <TouchableOpacity onPress={addVisitor} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#4361ee',
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 8,
                            }}>
                                <Icon name="person-add-outline" size={18} color="#fff" />
                                <Text style={{ color: '#fff', marginLeft: 5, fontWeight: '600', }}    >
                                    Add Visitor
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {visitors.map((visitor, index) => (
                        <View key={index} style={{
                            marginTop: 10,
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            borderRadius: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 5 }}>
                                    Visitor {index + 1}
                                </Text>

                                <TouchableOpacity onPress={() => removeVisitor(index)} style={{ marginBottom: 5, }}>
                                    <Icon name="close-circle" size={22} color="#ef4444" />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                placeholder="Visitor Name*"
                                placeholderTextColor="#8d99ae"
                                style={styles.input}
                                value={visitor.name}
                                onChangeText={(v) => handleVisitorChange(index, 'name', v)}
                            />

                            <TextInput
                                placeholder="Visitor Phone*"
                                placeholderTextColor="#8d99ae"
                                keyboardType="phone-pad"
                                maxLength={10}
                                style={styles.input}
                                value={visitor.phone}
                                onChangeText={(v) => handleVisitorChange(index, 'phone', v)}
                            />

                            <TextInput
                                placeholder="Visitor Email*"
                                placeholderTextColor="#8d99ae"
                                keyboardType="email-address"
                                style={styles.input}
                                value={visitor.email}
                                onChangeText={(v) => handleVisitorChange(index, 'email', v)}
                            />
                        </View>
                    )
                    )}

                    {!paymentDone && (
                        <TouchableOpacity style={styles.button} onPress={handlePayment} disabled={loading}>
                            {loading ? (<ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Icon name="card-outline" size={20} color="#fff" />
                                    <Text style={styles.btnText}>
                                        Pay Now
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    )}

                    {paymentDone && (
                        <>
                            <View style={{
                                marginTop: 15,
                                padding: 12,
                                borderRadius: 8,
                                backgroundColor: '#ecfdf5',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <Icon name="checkmark-circle" size={22} color="#10b981" />
                                <Text style={{ marginLeft: 8, color: '#059669', fontWeight: '600', }}>
                                    Payment completed
                                </Text>
                            </View>

                            <TouchableOpacity style={[styles.button, { marginTop: 15, backgroundColor: '#10b981' }]}
                                onPress={handleSubmit} disabled={loading}>
                                {loading ? (<ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.btnText}>
                                        I Have Completed Payment
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default EventRegisterScreen;