import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/LoginScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../services/authApi';
import SafeAreaWrapper from './SafeAreaWrapper';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true);
            }
        );

        const hideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
            }
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter valid username and password');
            return;
        }

        try {
            setLoading(true);
            const response = await loginUser({
                username: username,
                password: password,
            });

            setLoading(false);
            if (response?.token) {
                await AsyncStorage.setItem('userId', String(response.id));
                await AsyncStorage.setItem('userName', response.name);
                await AsyncStorage.setItem('token', response.token);
                await AsyncStorage.setItem('role', response.role);

                navigation.replace('Home');
            } else {
                Alert.alert('Error', response?.message || 'Login failed');
            }

        } catch (error: any) {
            setLoading(false);
            Alert.alert('Error', error?.message || 'Something went wrong');
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

                    <LinearGradient
                        colors={['#4361ee', '#3f37c9']}
                        style={{ flex: 1 }}
                    >

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                paddingHorizontal: 20,
                                paddingBottom: keyboardOpen ? 50 : 20,
                            }}
                        >

                            <View style={styles.circleTop} />
                            <View style={styles.circleBottom} />

                            {/* CARD */}
                            <View style={styles.card}>

                                {/* LOGO */}
                                <View style={styles.logoWrapper}>
                                    <Image
                                        source={require('../assets/logo.png')}
                                        style={styles.logo}
                                    />
                                </View>

                                <Text style={styles.title}>
                                    Welcome Back
                                </Text>

                                <Text style={styles.subtitle}>
                                    Login to continue
                                </Text>

                                {/* USERNAME */}
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="person-outline"
                                        size={20}
                                        color="#8d99ae"
                                    />

                                    <TextInput
                                        placeholder="Username"
                                        placeholderTextColor="#8d99ae"
                                        style={styles.input}
                                        value={username}
                                        onChangeText={setUsername}
                                        keyboardType="default"
                                    />
                                </View>

                                {/* PASSWORD */}
                                <View style={styles.inputContainer}>
                                    <Icon
                                        name="lock-closed-outline"
                                        size={20}
                                        color="#8d99ae"
                                    />

                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor="#8d99ae"
                                        secureTextEntry={secureText}
                                        style={styles.input}
                                        value={password}
                                        onChangeText={setPassword}
                                    />

                                    <TouchableOpacity
                                        onPress={() =>
                                            setSecureText(!secureText)
                                        }
                                    >
                                        <Icon
                                            name={
                                                secureText
                                                    ? 'eye-off-outline'
                                                    : 'eye-outline'
                                            }
                                            size={20}
                                            color="#8d99ae"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* FORGOT PASSWORD */}
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            'ForgotPassword'
                                        )
                                    }
                                >
                                    <Text style={styles.forgot}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>

                                {/* BUTTON */}
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleLogin}
                                    activeOpacity={0.8}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.btnText}>
                                            Sign In
                                        </Text>
                                    )}
                                </TouchableOpacity>

                                {/* SIGNUP */}
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Register')
                                    }
                                >
                                    <Text style={styles.signup}>
                                        Don’t have an account?

                                        <Text style={styles.signupLink}>
                                            {' '}Sign up
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default LoginScreen;
