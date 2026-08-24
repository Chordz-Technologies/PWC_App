import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/MembersScreenStyle';
import { getAllChapters, getMembersByChapter, } from '../services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChapterMembersScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [chapters, setChapters] = useState<any[]>([]);
    const [selectedChapter, setSelectedChapter] = useState('');
    const [members, setMembers] = useState<any[]>([]);

    useEffect(() => {
        fetchChapters();
    }, []);

    const fetchChapters = async () => {
        try {
            const res = await getAllChapters();
            const formatted =
                res.all_chapters.map((item: any) => ({
                    label: item.chapterName,
                    value: item.id,
                }));
            setChapters(formatted);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChapterMembers = async (chapterId: any) => {
        try {
            setLoading(true);
            setSelectedChapter(chapterId);
            const res =
                await getMembersByChapter(chapterId);
            if (res?.all_members) {
                setMembers(res.all_members);
            } else {
                setMembers([]);
            }
        } catch (error) {
            console.log(error);
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const checkSubscriptionAndNavigate = async (
        screenName: string,
        params: any = {},
    ) => {
        try {
            const status = await AsyncStorage.getItem('subscription_status');
            if (status?.toUpperCase() === 'ACTIVE') {
                navigation.navigate(screenName, params);
            } else {
                Alert.alert(
                    'Subscription Required',
                    'Please subscribe yourself first to use this feature.',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Subscribe Now',
                            onPress: () => {
                                navigation.navigate('Subscriptions');
                            },
                        },
                    ],
                );
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to check subscription status.',);
        }
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* HEADER */}
                <LinearGradient
                    colors={['#4361ee', '#3f37c9']}
                    style={styles.header}
                >
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
                        Chapter-wise Members
                    </Text>
                </LinearGradient>

                <ScrollView
                    contentContainerStyle={{ padding: 15 }}
                    showsVerticalScrollIndicator={false}
                >

                    {/* DROPDOWN */}
                    <Text style={styles.label}>
                        Select Chapter
                    </Text>

                    <Dropdown
                        style={[styles.input, { marginBottom: 20 }]}
                        data={chapters}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Chapter"
                        placeholderStyle={{ color: '#999' }}
                        value={selectedChapter}
                        onChange={(item) => {
                            handleChapterMembers(item.value);
                        }}
                    />

                    {/* MEMBERS */}
                    {loading ? (

                        <ActivityIndicator
                            size="large"
                            color="#4361ee"
                            style={{ marginTop: 30 }}
                        />

                    ) : members.length === 0 ? (

                        <Text style={styles.emptyText}>
                            No Members Found
                        </Text>

                    ) : (

                        members.map((item, index) => (

                            <TouchableOpacity
                                key={index}
                                style={styles.card}
                                activeOpacity={0.8}
                            >

                                {/* TOP */}
                                <View style={styles.cardTop}>

                                    <View style={styles.avatar}>
                                        <Text style={styles.avatarText}>
                                            {item.name
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: 12
                                        }}
                                    >
                                        <Text style={styles.memberName}>
                                            {item.name}
                                        </Text>

                                        <Text
                                            style={
                                                styles.businessCategory
                                            }
                                        >
                                            {
                                                item.business_category
                                                || 'Business'
                                            }
                                        </Text>
                                    </View>

                                </View>

                                {/* DETAILS */}
                                <View style={{ marginTop: 12 }}>

                                    <Text style={styles.infoText}>
                                        📧 {item.email || 'N/A'}
                                    </Text>

                                    <Text style={styles.infoText}>
                                        📞 {item.phone || 'N/A'}
                                    </Text>

                                    <Text style={styles.infoText}>
                                        📍 {
                                            item.office_address
                                            || 'No Address'
                                        }
                                    </Text>

                                </View>

                                {/* BUTTONS */}
                                <View style={styles.buttonContainer}>

                                    {/* VIEW DETAILS */}
                                    <TouchableOpacity
                                        style={styles.viewButton}
                                        onPress={() =>
                                            navigation.navigate(
                                                'MemberProfileDetails',
                                                {
                                                    memberId: item.id
                                                }
                                            )
                                        }
                                    >
                                        <Icon
                                            name="information-circle"
                                            size={16}
                                            color="#1e1b8f"
                                        />

                                        <Text
                                            style={
                                                styles.viewButtonText
                                            }
                                        >
                                            View Details
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={styles.bottomButtons}>

                                        {/* REFERENCE */}
                                        <TouchableOpacity
                                            style={
                                                styles.referenceButton
                                            }
                                            onPress={() =>
                                                checkSubscriptionAndNavigate(
                                                    'AddReferral',
                                                    {
                                                        memberId: item.id,
                                                        memberName: item.name,
                                                    }
                                                )
                                            }
                                        >
                                            <Icon
                                                name="people"
                                                size={15}
                                                color="#fff"
                                            />

                                            <Text
                                                style={
                                                    styles.bottomButtonText
                                                }
                                            >
                                                Give Reference
                                            </Text>
                                        </TouchableOpacity>

                                        {/* ONE TO ONE */}
                                        <TouchableOpacity
                                            style={
                                                styles.meetingButton
                                            }
                                            onPress={() =>
                                                checkSubscriptionAndNavigate(
                                                    'AddOneToOne',
                                                    {
                                                        memberId: item.id,
                                                        memberName: item.name,
                                                    }
                                                )
                                            }
                                        >
                                            <Icon
                                                name="calendar"
                                                size={15}
                                                color="#fff"
                                            />

                                            <Text
                                                style={
                                                    styles.bottomButtonText
                                                }
                                            >
                                                Register One to One
                                            </Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </TouchableOpacity>
                        ))
                    )}

                </ScrollView>

            </View>

        </SafeAreaWrapper>
    );
};

export default ChapterMembersScreen;