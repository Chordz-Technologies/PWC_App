import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, Alert, ActivityIndicator, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/BirthdayScreenStyle';
import { getAllBirthdays } from '../services/authApi';

const BirthdayScreen = ({ navigation }: any) => {

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBirthdays();
    }, []);

    const loadBirthdays = async () => {
        try {
            const res = await getAllBirthdays();

            if (res?.all_members) {
                setMembers(res.all_members);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Unable to load birthdays');
        } finally {
            setLoading(false);
        }
    };

    const openWhatsapp = async (name: string, phone: string) => {

        const message =
            `🎉 Happy Birthday ${name}! 🎂

Wishing you a wonderful year filled with happiness, success, good health, and prosperity.

Have a fantastic birthday! 🎈🥳

- Pune Women's Club`;

        const url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

        try {
            await Linking.openURL(url);
        } catch (error) {
            Alert.alert('Error', 'WhatsApp is not installed.');
        }
    };

    const formatDate = (dob: string) => {
        const date = new Date(dob);

        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
        });
    };

    if (loading) {
        return (
            <SafeAreaWrapper>
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#4361ee" />
                </View>
            </SafeAreaWrapper>
        );
    }

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* Header */}

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
                        Birthdays
                    </Text>
                </LinearGradient>

                <FlatList
                    data={members}
                    keyExtractor={(item: any, index) => index.toString()}
                    contentContainerStyle={{ padding: 15 }}
                    renderItem={({ item }: any) => (

                        <View style={styles.card}>

                            <View style={{ flex: 1 }}>

                                <Text style={styles.name}>
                                    {item.name}
                                </Text>

                                <Text style={styles.text}>
                                    🎂 {formatDate(item.dob)}
                                </Text>

                                <Text style={styles.text}>
                                    📞 {item.phone}
                                </Text>

                            </View>

                            <TouchableOpacity
                                style={styles.whatsappButton}
                                onPress={() =>
                                    openWhatsapp(item.name, item.phone)
                                }
                            >
                                <Icon
                                    name="logo-whatsapp"
                                    size={26}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaWrapper>
    );
};

export default BirthdayScreen;