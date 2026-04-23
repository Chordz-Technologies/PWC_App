import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/LoginScreenStyle';

import { loginUser } from '../services/authApi';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);

    // 🔍 Validate Email or Mobile
    // const isValidInput = (value: string) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     const mobileRegex = /^[0-9]{10}$/;

    //     return emailRegex.test(value) || mobileRegex.test(value);
    // };

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter valid username and password');
            return;
        }

        // if (!isValidInput(username)) {
        //     Alert.alert('Error', 'Enter valid email or 10-digit mobile number');
        //     return;
        // }

        try {
            setLoading(true);

            const response = await loginUser({
                username: username,
                password: password,
            });

            setLoading(false);

            if (response?.token) {
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
        <LinearGradient
            colors={['#4361ee', '#3f37c9']}
            style={styles.container}
        >
            <View style={styles.circleTop} />
            <View style={styles.circleBottom} />

            {/* 🔷 CARD */}
            <View style={styles.card}>

                {/* 🔷 LOGO */}
                <View style={styles.logoWrapper}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />
                </View>

                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Login to continue</Text>

                {/* 🔷 EMAIL / MOBILE */}
                <View style={styles.inputContainer}>
                    <Icon name="person-outline" size={20} color="#8d99ae" />
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#8d99ae"
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        keyboardType="default"
                    />
                </View>

                {/* 🔷 PASSWORD */}
                <View style={styles.inputContainer}>
                    <Icon name="lock-closed-outline" size={20} color="#8d99ae" />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#8d99ae"
                        secureTextEntry={secureText}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Icon
                            name={secureText ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#8d99ae"
                        />
                    </TouchableOpacity>
                </View>

                {/* 🔷 FORGOT PASSWORD */}
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* 🔷 BUTTON */}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.btnText}>Sign In</Text>
                    )}
                </TouchableOpacity>

                {/* 🔷 SIGNUP */}
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.signup}>
                        Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
                    </Text>
                </TouchableOpacity>

            </View>

        </LinearGradient>
    );
};

export default LoginScreen;
