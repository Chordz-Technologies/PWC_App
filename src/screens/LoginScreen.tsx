import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Platform, Modal, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/LoginScreenStyle';
import { loginUser, forgotPassword } from '../services/authApi';
import SafeAreaWrapper from './SafeAreaWrapper';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [forgotModalVisible, setForgotModalVisible] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);
    const [secureNewPassword, setSecureNewPassword] = useState(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true);
            },
        );

        const hideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
            },
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter valid username and password',);
            return;
        }

        try {
            setLoading(true);
            const response = await loginUser({
                username: username,
                password: password,
            });

            setLoading(false);

            if (response?.status === 'success') {
                await AsyncStorage.setItem('userId', String(response.id),);
                await AsyncStorage.setItem('userName', response.name,);
                await AsyncStorage.setItem('token', response.token,);
                await AsyncStorage.setItem('role', response.role,);
                await AsyncStorage.setItem('chapter_id', response.chapter_id.toString(),);
                await AsyncStorage.setItem('subscription_status', response.subscription_status,);
                navigation.replace('Home');
            } else {
                Alert.alert('Error', response?.message || 'Login failed',);
            }
        } catch (error: any) {
            setLoading(false);
            Alert.alert('Error', error?.response?.data?.message || error?.message || 'Something went wrong',);
        }
    };

    const openForgotPasswordModal = () => {
        setForgotEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setSecureNewPassword(true);
        setSecureConfirmPassword(true);
        setForgotModalVisible(true);
    };

    const closeForgotPasswordModal = () => {
        if (forgotLoading) {
            return;
        }
        Keyboard.dismiss();
        setForgotModalVisible(false);
    };

    const handleForgotPassword = async () => {
        if (forgotLoading) {
            return;
        }

        // Email validation
        if (!forgotEmail.trim()) {
            Alert.alert('Required', 'Please enter your email.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(forgotEmail.trim())) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.',);
            return;
        }

        // New password validation
        if (!newPassword) {
            Alert.alert('Required', 'Please enter your new password.',);
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Invalid Password', 'Password must be at least 6 characters.',);
            return;
        }

        // Confirm password validation
        if (!confirmPassword) {
            Alert.alert('Required', 'Please confirm your new password.',);
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert(
                'Password Mismatch',
                'New password and confirm password do not match.',
            );
            return;
        }

        try {
            setForgotLoading(true);
            const payload = {
                email: forgotEmail.trim(),
                new_password: newPassword,
                confirm_password: confirmPassword,
            };

            const response = await forgotPassword(payload);
            if (
                response?.status === 'success' ||
                response?.code === 200 ||
                response?.code === 201
            ) {
                setForgotLoading(false);
                Keyboard.dismiss();
                setForgotModalVisible(false);
                setForgotEmail('');
                setNewPassword('');
                setConfirmPassword('');
                Alert.alert('Success', 'Password reset successfully. You can now login with your new password.',);
            } else {
                setForgotLoading(false);
                Alert.alert('Failed', response?.message || 'Unable to reset password. Please try again.',);
            }
        } catch (error: any) {
            setForgotLoading(false);
            const serverMessage =
                error?.response?.data?.message ||
                error?.response?.data?.detail ||
                error?.response?.data?.error;
            Alert.alert('Reset Password Failed', serverMessage || 'Something went wrong. Please try again.',);
        }
    };

    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <LinearGradient colors={['#4361ee', '#3f37c9']} style={{ flex: 1 }}>
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                paddingHorizontal: 20,
                                paddingBottom: keyboardOpen ? 50 : 20,
                            }}>

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
                                        }>
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
                                    style={styles.forgotButton}
                                    onPress={openForgotPasswordModal}
                                    activeOpacity={0.7}>
                                    <Text style={styles.forgotText}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>

                                {/* LOGIN BUTTON */}
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleLogin}
                                    activeOpacity={0.8}>
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
                                    }>
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

            <Modal
                visible={forgotModalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeForgotPasswordModal}>

                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView
                        style={styles.modalKeyboard}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContentWrapper}>
                                <View style={styles.modalCard}>

                                    {/* MODAL HEADER */}
                                    <View style={styles.modalHeader}>
                                        <View>
                                            <Text style={styles.modalTitle}>
                                                Forgot Password
                                            </Text>

                                            <Text style={styles.modalSubtitle}>
                                                Enter your details to reset your password
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={closeForgotPasswordModal}
                                            disabled={forgotLoading}
                                            style={styles.closeButton}>

                                            <Icon
                                                name="close"
                                                size={23}
                                                color="#374151"
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        keyboardShouldPersistTaps="handled">

                                        {/* EMAIL */}
                                        <Text style={styles.fieldLabel}>
                                            Email
                                        </Text>

                                        <View style={styles.modalInputContainer}>
                                            <Icon
                                                name="mail-outline"
                                                size={20}
                                                color="#8d99ae"
                                            />

                                            <TextInput
                                                placeholder="Enter your email"
                                                placeholderTextColor="#9ca3af"
                                                style={styles.modalInput}
                                                value={forgotEmail}
                                                onChangeText={setForgotEmail}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                            />
                                        </View>

                                        {/* NEW PASSWORD */}
                                        <Text style={styles.fieldLabel}>
                                            New Password
                                        </Text>

                                        <View style={styles.modalInputContainer}>
                                            <Icon
                                                name="lock-closed-outline"
                                                size={20}
                                                color="#8d99ae"
                                            />

                                            <TextInput
                                                placeholder="Enter new password"
                                                placeholderTextColor="#9ca3af"
                                                style={styles.modalInput}
                                                value={newPassword}
                                                onChangeText={setNewPassword}
                                                secureTextEntry={secureNewPassword}
                                            />

                                            <TouchableOpacity
                                                onPress={() =>
                                                    setSecureNewPassword(!secureNewPassword)
                                                }>

                                                <Icon
                                                    name={
                                                        secureNewPassword
                                                            ? 'eye-off-outline'
                                                            : 'eye-outline'
                                                    }
                                                    size={20}
                                                    color="#8d99ae"
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        {/* CONFIRM PASSWORD */}
                                        <Text style={styles.fieldLabel}>
                                            Confirm Password
                                        </Text>

                                        <View style={styles.modalInputContainer}>
                                            <Icon
                                                name="lock-closed-outline"
                                                size={20}
                                                color="#8d99ae"
                                            />

                                            <TextInput
                                                placeholder="Confirm new password"
                                                placeholderTextColor="#9ca3af"
                                                style={styles.modalInput}
                                                value={confirmPassword}
                                                onChangeText={setConfirmPassword}
                                                secureTextEntry={secureConfirmPassword}
                                            />

                                            <TouchableOpacity
                                                onPress={() =>
                                                    setSecureConfirmPassword(
                                                        !secureConfirmPassword,
                                                    )
                                                }>

                                                <Icon
                                                    name={
                                                        secureConfirmPassword
                                                            ? 'eye-off-outline'
                                                            : 'eye-outline'
                                                    }
                                                    size={20}
                                                    color="#8d99ae"
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        {/* PASSWORD INFO */}
                                        <View style={styles.passwordInfo}>
                                            <Icon
                                                name="information-circle-outline"
                                                size={17}
                                                color="#4361ee"
                                            />

                                            <Text style={styles.passwordInfoText}>
                                                Password must contain at least 6 characters.
                                            </Text>
                                        </View>

                                        {/* SUBMIT */}
                                        <TouchableOpacity
                                            style={[
                                                styles.resetButton,
                                                forgotLoading &&
                                                styles.resetButtonDisabled,
                                            ]}
                                            onPress={handleForgotPassword}
                                            disabled={forgotLoading}
                                            activeOpacity={0.8}>

                                            {forgotLoading ? (
                                                <ActivityIndicator color="#fff" />
                                            ) : (
                                                <>
                                                    <Icon
                                                        name="checkmark-circle-outline"
                                                        size={20}
                                                        color="#fff"
                                                    />

                                                    <Text style={styles.resetButtonText}>
                                                        Reset Password
                                                    </Text>
                                                </>
                                            )}
                                        </TouchableOpacity>

                                        {/* CANCEL */}
                                        <TouchableOpacity
                                            style={styles.cancelButton}
                                            onPress={closeForgotPasswordModal}
                                            disabled={forgotLoading}>
                                            <Text style={styles.cancelButtonText}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </SafeAreaWrapper>
    );
};

export default LoginScreen;