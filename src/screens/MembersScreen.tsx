import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/MembersScreenStyle';
import { searchMemberByName, searchMemberByCategory, } from '../services/authApi';

const MembersScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [members, setMembers] = useState<any[]>([]);
    const [searchType, setSearchType] = useState<'name' | 'business'>('name');

    useEffect(() => {

        // 🔷 REMOVE CARDS WHEN SEARCH EMPTY
        if (search.trim() === '') {
            setMembers([]);
        }

    }, [search]);

    const handleSearch = async (type: 'name' | 'business') => {
        if (!search.trim()) {
            setMembers([]);
            return;
        }
        try {
            setLoading(true);
            let res;

            // 🔷 SEARCH BY MEMBER NAME
            if (type === 'name') {
                setSearchType('name');
                res = await searchMemberByName(search);
            } else {

                // 🔷 SEARCH BY BUSINESS CATEGORY
                setSearchType('business');
                res = await searchMemberByCategory(search);
            }
            if (res?.data) {
                setMembers(res.data);
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

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
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
                        Members
                    </Text>
                </LinearGradient>
                <ScrollView
                    contentContainerStyle={{ padding: 15 }}
                    showsVerticalScrollIndicator={false}
                >

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 15,
                        }}
                    >

                        {/* SEARCH */}
                        <View
                            style={[
                                styles.searchContainer,
                                {
                                    flex: 1,
                                    marginBottom: 0,
                                }
                            ]}
                        >
                            <Icon
                                name="search"
                                size={20}
                                color="#8d99ae"
                            />

                            <TextInput
                                placeholder={
                                    searchType === 'name'
                                        ? 'Search Member Name'
                                        : 'Search Business Category'
                                }
                                placeholderTextColor="#999"
                                style={styles.searchInput}
                                value={search}
                                onChangeText={setSearch}
                            />
                        </View>

                        {/* CHAPTER BUTTON */}
                        <TouchableOpacity
                            style={{
                                width: 48,
                                height: 48,
                                backgroundColor: '#4361ee',
                                borderRadius: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 10,
                            }}
                            onPress={() =>
                                navigation.navigate('ChapterMembers')
                            }
                        >
                            <Icon
                                name="people"
                                size={22}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* 🔷 BUTTONS */}
                    <View style={styles.tabContainer}>

                        {/* MEMBER NAME BUTTON */}
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                searchType === 'name' &&
                                styles.activeTabButton
                            ]}
                            onPress={() => handleSearch('name')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    searchType === 'name' &&
                                    styles.activeTabText
                                ]}
                            >
                                Search By Member Name
                            </Text>
                        </TouchableOpacity>

                        {/* BUSINESS BUTTON */}
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                searchType === 'business' &&
                                styles.activeTabButton
                            ]}
                            onPress={() => handleSearch('business')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    searchType === 'business' &&
                                    styles.activeTabText
                                ]}
                            >
                                Search By Business
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* 🔷 LIST */}
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
                                            {item.name?.charAt(0)?.toUpperCase()}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 12 }}>
                                        <Text style={styles.memberName}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.businessCategory}>
                                            {item.business_category || 'Business'}
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
                                        📍 {item.office_address || 'No Address'}
                                    </Text>
                                </View>

                                {/* 🔷 BUTTONS */}
                                <View style={styles.buttonContainer}>

                                    {/* VIEW DETAILS */}
                                    <TouchableOpacity
                                        style={styles.viewButton}
                                        onPress={() =>
                                            navigation.navigate('MemberProfileDetails', {
                                                memberId: item.id
                                            })
                                        }
                                    >
                                        <Icon
                                            name="information-circle"
                                            size={16}
                                            color="#1e1b8f"
                                        />
                                        <Text style={styles.viewButtonText}>
                                            View Details
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.bottomButtons}>

                                        {/* GIVE REFERENCE */}
                                        <TouchableOpacity
                                            style={styles.referenceButton}
                                            onPress={() =>
                                                navigation.navigate('AddReferral', {
                                                    memberId: item.id,
                                                    memberName: item.name,
                                                })
                                            }
                                        >
                                            <Icon
                                                name="people"
                                                size={15}
                                                color="#fff"
                                            />
                                            <Text style={styles.bottomButtonText}>
                                                Give Reference
                                            </Text>
                                        </TouchableOpacity>

                                        {/* 1:1 MEETING */}
                                        <TouchableOpacity
                                            style={styles.meetingButton}
                                            onPress={() =>
                                                navigation.navigate('OneToOne', {
                                                    memberId: item.id,
                                                    memberName: item.name,
                                                })
                                            }
                                        >
                                            <Icon
                                                name="calendar"
                                                size={15}
                                                color="#fff"
                                            />
                                            <Text style={styles.bottomButtonText}>
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

export default MembersScreen;