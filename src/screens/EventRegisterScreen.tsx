import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/EventRegisterScreenStyle';
import SafeAreaWrapper from './SafeAreaWrapper';
import { registerForEvent } from '../services/authApi';

const EventRegisterScreen = ({ navigation, route }: any) => {
    const { eventId } = route.params;
    const [loading, setLoading] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        business_category: '',
        address: '',
    });

    const handleChange = (key: string, value: string) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const handlePayment = async () => {
        try {

            await Linking.openURL(
                'https://razorpay.me/@punewomensclub'
            );

            Alert.alert(
                'Payment',
                'After completing the payment, come back and click "I Have Completed Payment".'
            );

            setPaymentDone(true);

        } catch (e) {

            Alert.alert(
                'Error',
                'Unable to open payment page.'
            );
        }
    };

    const handleSubmit = async () => {

        if (!form.name || !form.phone || !form.email || !form.business_category || !form.address) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        try {

            setLoading(true);

            const payload = {
                ...form,
                event: eventId,
            };

            const res = await registerForEvent(payload);

            setLoading(false);

            Alert.alert(
                'Success', 'Event Registration Successful'
            );

            navigation.goBack();

        } catch (error) {

            setLoading(false);

            console.log(error);

            Alert.alert(
                'Error',
                'Failed to register for event'
            );
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
                    <Text style={styles.headerTitle}>Event Registration</Text>
                </LinearGradient>

                <ScrollView contentContainerStyle={{ padding: 15 }}>

                    {/* PERSON 1 */}
                    <Text style={styles.label}>Full Name*</Text>
                    <TextInput
                        placeholder="Enter Full Name"
                        placeholderTextColor="#8d99ae"
                        style={styles.input}
                        value={form.name}
                        onChangeText={(v) => handleChange('name', v)}
                    />

                    {/* PHONE */}
                    <Text style={styles.label}>Mobile Number*</Text>
                    <TextInput
                        placeholder="Enter Mobile Number"
                        placeholderTextColor="#8d99ae"
                        keyboardType="numeric"
                        maxLength={10}
                        style={styles.input}
                        value={form.phone}
                        onChangeText={(v) =>
                            handleChange('phone', v)
                        }
                    />

                    {/* EMAIL */}
                    <Text style={styles.label}>Email Address*</Text>
                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#8d99ae"
                        keyboardType="email-address"
                        style={styles.input}
                        value={form.email}
                        onChangeText={(v) =>
                            handleChange('email', v)
                        }
                    />

                    {/* BUSINESS CATEGORY */}
                    <Text style={styles.label}>Business Category*</Text>
                    <TextInput
                        placeholder="Enter Business Category"
                        placeholderTextColor="#8d99ae"
                        style={styles.input}
                        value={form.business_category}
                        onChangeText={(v) =>
                            handleChange('business_category', v)
                        }
                    />

                    {/* ADDRESS */}
                    <Text style={styles.label}>Address*</Text>
                    <TextInput
                        placeholder="Enter Address"
                        placeholderTextColor="#8d99ae"
                        style={[styles.input, { height: 100 }]}
                        multiline
                        textAlignVertical="top"
                        value={form.address}
                        onChangeText={(v) =>
                            handleChange('address', v)
                        }
                    />

                    {/* BUTTON */}
                    <TouchableOpacity style={styles.button} onPress={handlePayment}>
                        <Text style={styles.btnText}>Pay Now</Text>
                    </TouchableOpacity>

                    {paymentDone && (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    marginTop: 15,
                                    backgroundColor: '#10b981',
                                },
                            ]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.btnText}>
                                I Have Completed Payment
                            </Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default EventRegisterScreen;