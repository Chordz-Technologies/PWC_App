import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/ProfileScreenStyle';
import SafeAreaWrapper from './SafeAreaWrapper';

const ProfileScreen = ({ navigation }: any) => {

    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const name = await AsyncStorage.getItem('userName');
        const id = await AsyncStorage.getItem('userId');

        if (name) setUserName(name);
        if (id) setUserId(id);
    };

    const getInitial = () => {
        return userName ? userName.charAt(0).toUpperCase() : 'U';
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await AsyncStorage.removeItem('userId');
                        await AsyncStorage.removeItem('userName');
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('role');
                        navigation.replace('Login');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaWrapper>

            <View style={styles.container}>

                {/* HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                </LinearGradient>

                {/* PROFILE CARD */}
                <View style={styles.card}>

                    {/* AVATAR */}
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitial()}</Text>
                        </View>
                    </View>

                    {/* NAME */}
                    <Text style={styles.name}>{userName}</Text>
                </View>

                {/* ANALYTICS CARD */}
                <TouchableOpacity
                    style={styles.editProfileCard}
                    onPress={() => navigation.navigate('Analytics', { userId })}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="analytics-outline" size={20} color="#4361ee" />
                        <Text style={styles.editProfileText}>Analytics</Text>
                    </View>

                    <Icon name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

                {/* TOP 5 CLIENTS CARD */}
                <TouchableOpacity
                    style={styles.editProfileCard}
                    onPress={() => navigation.navigate('Clients', { userId })}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="people-outline" size={20} color="#4361ee" />
                        <Text style={styles.editProfileText}>Top 5 Clients</Text>
                    </View>

                    <Icon name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

                {/* EDIT PROFILE CARD */}
                <TouchableOpacity
                    style={styles.editProfileCard}
                    onPress={() => navigation.navigate('EditProfile', { userId })}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="person-outline" size={20} color="#4361ee" />
                        <Text style={styles.editProfileText}>Personal Details</Text>
                    </View>

                    <Icon name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

                {/* BUSINESS DETAILS CARD */}
                <TouchableOpacity
                    style={styles.editProfileCard}
                    onPress={() => navigation.navigate('BusinessProfile', { userId })}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="business-outline" size={20} color="#4361ee" />
                        <Text style={styles.editProfileText}>Business Details</Text>
                    </View>

                    <Icon name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

                {/* LOGOUT PROFILE CARD */}
                <TouchableOpacity
                    style={styles.editProfileCard}
                    onPress={handleLogout}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="log-out-outline" size={20} color="#4361ee" />
                        <Text style={styles.editProfileText}>Logout</Text>
                    </View>

                    <Icon name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>

            </View>
        </SafeAreaWrapper>
    );
};

export default ProfileScreen;