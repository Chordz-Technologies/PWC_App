import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/AddVisitorScreenStyle';
import { registerUser } from '../services/authApi';

const AddVisitorScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        gst_no: '',
        business_category: '',
    });

    const handleChange = (
        key: string,
        value: string
    ) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        if (
            !form.name || !form.phone || !form.business_category
        ) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        try {
            setLoading(true);

            const payload = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                gst_no: form.gst_no,
                business_category: form.business_category,
                role: 'VISITOR',
            };

            const response = await registerUser(payload);
            console.log('Response', response);
            Alert.alert(
                'Success',
                'Visitor added successfully'
            );

            navigation.goBack();

        } catch (error: any) {

            Alert.alert(
                'Error',
                error?.message || 'Something went wrong'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, backgroundColor: '#f5f6fa' }}>

                        {/* HEADER */}
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
                                Add Visitor
                            </Text>
                        </LinearGradient>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                padding: 15,
                                flexGrow: 1,
                                paddingBottom: 60,
                            }}
                        >

                            {/* NAME */}
                            <Text style={styles.label}>
                                Visitor Name*
                            </Text>

                            <TextInput
                                placeholder="Enter Visitor Name"
                                placeholderTextColor="#999"
                                style={styles.input}
                                value={form.name}
                                onChangeText={(v) =>
                                    setForm({
                                        ...form,
                                        name: v,
                                    })
                                }
                            />

                            {/* EMAIL */}
                            <Text style={styles.label}>
                                Email Address
                            </Text>

                            <TextInput
                                placeholder="Enter Email"
                                keyboardType="email-address"
                                placeholderTextColor="#999"
                                style={styles.input}
                                value={form.email}
                                onChangeText={(v) =>
                                    setForm({
                                        ...form,
                                        email: v,
                                    })
                                }
                            />

                            {/* GST */}
                            <Text style={styles.label}>
                                GST Number
                            </Text>

                            <TextInput
                                placeholder="Enter GST Number"
                                placeholderTextColor="#999"
                                style={styles.input}
                                value={form.gst_no}
                                onChangeText={(v) =>
                                    setForm({
                                        ...form,
                                        gst_no: v,
                                    })
                                }
                            />

                            {/* MOBILE */}
                            <Text style={styles.label}>
                                Mobile Number*
                            </Text>

                            <TextInput
                                placeholder="Enter Mobile Number"
                                keyboardType="number-pad"
                                maxLength={10}
                                placeholderTextColor="#999"
                                style={styles.input}
                                value={form.phone}
                                onChangeText={(v) =>
                                    setForm({
                                        ...form,
                                        phone: v,
                                    })
                                }
                            />

                            {/* BUSINESS */}
                            <Text style={styles.label}>
                                Business Category*
                            </Text>

                            <TextInput
                                placeholder="Enter Business Category"
                                placeholderTextColor="#999"
                                style={styles.input}
                                value={form.business_category}
                                onChangeText={(v) =>
                                    setForm({
                                        ...form,
                                        business_category: v,
                                    })
                                }
                            />

                            {/* BUTTON */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.btnText}>
                                        Add Visitor
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default AddVisitorScreen;