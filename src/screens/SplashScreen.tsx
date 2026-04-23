import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../styles/SplashScreenStyle';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
    return (
        <LinearGradient
            colors={['#4361ee', '#3f37c9']}
            style={styles.container}
        >

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

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.replace('Login')}
                >
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    );
};

export default SplashScreen;
