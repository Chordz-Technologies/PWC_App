import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/NotificationsScreenStyle';
import { getNotifications, clearNotifications, markAllAsRead } from "../services/notificationStorage";
import notifee from "@notifee/react-native";

// interface NotificationItem {
//     id: string | number;
//     title: string;
//     body: string;
//     timestamp: number | string;
// }

const NotificationsScreen = ({ navigation }: any) => {
    const [notifications, setNotifications] = useState<any[]>([]);

    const loadNotifications = async () => {
        const data: any[] = await getNotifications();
        setNotifications(data);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            await notifee.cancelAllNotifications();
            await markAllAsRead();
            loadNotifications();
        });
        return unsubscribe;
    }, [navigation]);

    const formatDate = (timestamp: number | string): string => {
        const d = new Date(timestamp);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        let hours = d.getHours();
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${day}/${month}/${year}  ${hours}:${minutes}:${seconds} ${ampm}`;
    };

    const clearAllNotifications = () => {
        if (notifications.length === 0) {
            Alert.alert(
                'No Notifications',
                'No notifications available'
            );
            return;
        }

        Alert.alert(
            'Clear Notifications',
            'Are you sure you want to clear all notifications?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {

                        await AsyncStorage.removeItem(
                            'notifications'
                        );

                        await clearNotifications();
                        setNotifications([]);
                        await notifee.cancelAllNotifications();
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.notificationCard}>
            <View style={styles.iconContainer}>
                <Icon
                    name="notifications"
                    size={22}
                    color="#4361ee"
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.title}>
                    {item.title || 'Notification'}
                </Text>

                <Text style={styles.message}>
                    {item.body || 'No message'}
                </Text>

                <Text style={styles.time}>
                    {formatDate(item.timestamp)}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>

                    {/* LEFT SECTION */}
                    <View style={styles.leftHeader}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Icon
                                name="arrow-back"
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>
                            Notifications
                        </Text>
                    </View>

                    {/* RIGHT SECTION */}
                    <TouchableOpacity onPress={clearAllNotifications} style={styles.button}>
                        <Text style={styles.clearText}>
                            Clear All
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* 🔷 LIST */}
                <FlatList
                    data={notifications}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 15,
                        paddingBottom: 30,
                        flexGrow: 1,
                    }}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon
                                name="notifications-off-outline"
                                size={70}
                                color="#c7c7c7"
                            />

                            <Text style={styles.emptyText}>
                                No Notifications Found
                            </Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaWrapper>
    );
};

export default NotificationsScreen;
