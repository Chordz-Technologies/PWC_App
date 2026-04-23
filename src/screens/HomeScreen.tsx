import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const HomeScreen = ({ navigation }: any) => {

    const handleLogout = () => {
        // 👉 Later you can clear token here
        // AsyncStorage.removeItem('token');

        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>

            {/* 🔷 HEADER */}
            <Text style={styles.title}>Welcome to PWC</Text>

            {/* 🔷 CARD */}
            <View style={styles.card}>
                <Text style={styles.cardText}>
                    You are successfully logged in 🎉
                </Text>
            </View>

            {/* 🔷 LOGOUT BUTTON */}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>

        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 30,
    },

    cardText: {
        fontSize: 16,
        textAlign: 'center',
    },

    button: {
        backgroundColor: '#ff4d4d',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
