import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../styles/SplashScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaWrapper from './SafeAreaWrapper';

const SplashScreen = ({ navigation }: any) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true);

            setTimeout(() => {
                navigation.replace('Home');
            }, 1500);
        }
    };

    return (
        <SafeAreaWrapper>
            <LinearGradient colors={['#4361ee', '#3f37c9']}
                style={styles.container} >

                {/* 🔵 BACKGROUND SHAPES */}
                <View style={styles.circleTop} />
                <View style={styles.circleBottom} />
                <View style={styles.circleSmall} />

                {/* 🔷 CONTENT */}
                <View style={styles.content}>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.appName}>Pune Women's Club</Text>

                    <Text style={styles.tagline}>
                        Creative Womens
                    </Text>

                    {!isLoggedIn && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.replace('Login')}
                        >
                            <Text style={styles.btnText}>Get Started</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>
        </SafeAreaWrapper>
    );
};

export default SplashScreen;
