import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert, Platform, Switch, PermissionsAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/MembersScreenStyle';
import { searchMemberByName, searchMemberByCategory, updateMemberLocation, getNearbyMembers } from '../services/authApi';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MembersScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [members, setMembers] = useState<any[]>([]);
    const [searchType, setSearchType] = useState<'name' | 'business'>('name');
    const [nearbyLocationEnabled, setNearbyLocationEnabled] = useState(false);
    // const [locationLoading, setLocationLoading] = useState(false);
    const [nearbyMembers, setNearbyMembers] = useState<any[]>([]);
    const [nearbyLoading, setNearbyLoading] = useState(false);

    useEffect(() => {
        if (search.trim() === '') {
            setMembers([]);
        }
    }, [search]);

    const handleSearch = async (type: 'name' | 'business') => {
        setNearbyLocationEnabled(false);
        setNearbyMembers([]);
        setSearchType(type);

        if (!search.trim()) {
            setMembers([]);
            return;
        }
        try {
            setLoading(true);
            let res;

            // SEARCH BY MEMBER NAME
            if (type === 'name') {
                setSearchType('name');
                res = await searchMemberByName(search);
            } else {

                // SEARCH BY BUSINESS CATEGORY
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

    const requestLocationPermission = async (): Promise<boolean> => {
        if (Platform.OS === 'ios') {
            const authorization = await Geolocation.requestAuthorization(
                'whenInUse',
            );

            return authorization === 'granted';
        }

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs your location to find nearby members.',
                    buttonPositive: 'Allow',
                    buttonNegative: 'Deny',
                },
            );

            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
            console.log('Location permission error:', error);
            return false;
        }
    };

    const getCurrentLocation = (): Promise<{
        latitude: number;
        longitude: number;
    }> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                error => {
                    console.log('Get current location error:', error);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                },
            );
        });
    };

    const fetchNearbyMembers = async (memberId: number) => {
        try {
            const response = await getNearbyMembers(memberId, 10);

            console.log('Nearby Members Response:', response);

            if (response?.status === 'success') {
                setNearbyMembers(response?.nearby_members || []);
            } else {
                setNearbyMembers([]);

                Alert.alert(
                    'Error',
                    response?.message ||
                    'Unable to fetch nearby members.',
                );
            }
        } catch (error: any) {
            console.log(
                'Nearby Members API Error:',
                error?.response?.data || error,
            );

            setNearbyMembers([]);

            Alert.alert(
                'Error',
                error?.response?.data?.message ||
                'Unable to fetch nearby members.',
            );
        }
    };

    const handleNearbyToggle = async (value: boolean) => {
        if (nearbyLoading) {
            return;
        }

        if (!value) {
            // -----------------------------
            // TURN OFF
            // -----------------------------

            setNearbyLocationEnabled(false);
            setNearbyMembers([]);

            return;
        }

        try {
            setNearbyLoading(true);

            // -----------------------------
            // STEP 1: GET MEMBER ID
            // -----------------------------

            const storedMemberId =
                await AsyncStorage.getItem('userId');

            if (!storedMemberId) {
                Alert.alert(
                    'Error',
                    'Member ID not found. Please login again.',
                );

                setNearbyLocationEnabled(false);
                setNearbyLoading(false);
                return;
            }

            const memberId = Number(storedMemberId);

            // -----------------------------
            // STEP 2: REQUEST LOCATION
            // -----------------------------

            const hasPermission =
                await requestLocationPermission();

            if (!hasPermission) {
                Alert.alert(
                    'Location Permission Required',
                    'Please allow location permission to find nearby members.',
                );

                setNearbyLocationEnabled(false);
                setNearbyLoading(false);
                return;
            }

            // -----------------------------
            // STEP 3: GET GPS LOCATION
            // -----------------------------

            const location = await getCurrentLocation();

            const { latitude, longitude } = location;

            console.log('Current Latitude:', latitude);
            console.log('Current Longitude:', longitude);

            // -----------------------------
            // STEP 4: UPDATE LOCATION
            // -----------------------------

            const locationPayload = {
                member_id: memberId,
                latitude: latitude,
                longitude: longitude,
                is_tracking_enabled: true,
            };

            console.log(
                'Update Location Payload:',
                locationPayload,
            );

            const locationResponse =
                await updateMemberLocation(
                    locationPayload,
                );

            console.log(
                'Update Location Response:',
                locationResponse,
            );

            // -----------------------------
            // STEP 5: CHECK UPDATE SUCCESS
            // -----------------------------

            if (
                locationResponse?.status !== 'success' &&
                locationResponse?.code !== 200 &&
                locationResponse?.code !== 201
            ) {
                throw new Error(
                    locationResponse?.message ||
                    'Unable to update location.',
                );
            }

            // -----------------------------
            // STEP 6: ENABLE TOGGLE
            // -----------------------------

            setNearbyLocationEnabled(true);

            // Clear normal search results
            setMembers([]);

            // -----------------------------
            // STEP 7: GET NEARBY MEMBERS
            // -----------------------------

            await fetchNearbyMembers(memberId);

        } catch (error: any) {
            console.log(
                'Nearby Location Flow Error:',
                error?.response?.data || error,
            );

            setNearbyLocationEnabled(false);
            setNearbyMembers([]);

            Alert.alert(
                'Error',
                error?.response?.data?.message ||
                error?.message ||
                'Unable to enable nearby location.',
            );
        } finally {
            setNearbyLoading(false);
        }
    };

    const displayMembers = nearbyLocationEnabled
        ? nearbyMembers
        : members;

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
                                !nearbyLocationEnabled &&
                                styles.activeTabButton,
                                nearbyLocationEnabled &&
                                styles.disabledTabButton,
                            ]}
                            onPress={() => handleSearch('name')}
                            disabled={nearbyLocationEnabled}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    searchType === 'name' &&
                                    !nearbyLocationEnabled &&
                                    styles.activeTabText,
                                    nearbyLocationEnabled &&
                                    styles.disabledTabText,
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
                                !nearbyLocationEnabled &&
                                styles.activeTabButton,
                                nearbyLocationEnabled &&
                                styles.disabledTabButton,
                            ]}
                            onPress={() => handleSearch('business')}
                            disabled={nearbyLocationEnabled}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    searchType === 'business' &&
                                    !nearbyLocationEnabled &&
                                    styles.activeTabText,
                                    nearbyLocationEnabled &&
                                    styles.disabledTabText,
                                ]}
                            >
                                Search By Business
                            </Text>
                        </TouchableOpacity>

                    </View>


                    {/* ================================= */}
                    {/* NEARBY MEMBERS TOGGLE */}
                    {/* ================================= */}

                    <View style={styles.nearbyLocationContainer}>

                        <View style={styles.nearbyLocationLeft}>

                            <Icon
                                name="location-outline"
                                size={23}
                                color={
                                    nearbyLocationEnabled
                                        ? '#4361ee'
                                        : '#777'
                                }
                            />

                            <View
                                style={styles.nearbyLocationTextContainer}
                            >

                                <Text
                                    style={styles.nearbyLocationTitle}
                                >
                                    Find Nearby Members
                                </Text>

                                <Text
                                    style={styles.nearbyLocationSubtitle}
                                >
                                    Members near your location
                                </Text>

                            </View>

                        </View>


                        {nearbyLoading ? (
                            <ActivityIndicator
                                size="small"
                                color="#4361ee"
                            />
                        ) : (
                            <Switch
                                value={nearbyLocationEnabled}
                                onValueChange={handleNearbyToggle}
                                trackColor={{
                                    false: '#d1d5db',
                                    true: '#a5b4fc',
                                }}
                                thumbColor={
                                    nearbyLocationEnabled
                                        ? '#4361ee'
                                        : '#f4f4f5'
                                }
                                ios_backgroundColor="#d1d5db"
                            />
                        )}
                    </View>

                    {/* 🔷 MEMBER LIST */}
                    {loading || nearbyLoading ? (
                        <ActivityIndicator
                            size="large"
                            color="#4361ee"
                            style={{ marginTop: 30 }}
                        />
                    ) : displayMembers.length === 0 ? (
                        <Text style={styles.emptyText}>
                            {nearbyLocationEnabled
                                ? 'No Nearby Members Found'
                                : 'No Members Found'}
                        </Text>
                    ) : (
                        displayMembers.map((item, index) => (
                            <TouchableOpacity
                                key={item.id?.toString() || index.toString()}
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
                                            marginLeft: 12,
                                        }}
                                    >

                                        <Text style={styles.memberName}>
                                            {item.name}
                                        </Text>

                                        <Text style={styles.businessCategory}>
                                            {item.business_category || 'Business'}
                                        </Text>

                                    </View>

                                    {/* NEARBY DISTANCE */}
                                    {nearbyLocationEnabled &&
                                        item.distance_km !== undefined && (
                                            <View style={styles.distanceBadge}>
                                                <Icon
                                                    name="location"
                                                    size={13}
                                                    color="#4361ee"
                                                />

                                                <Text style={styles.distanceText}>
                                                    {item.distance_km} km
                                                </Text>
                                            </View>
                                        )}

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


                                {/* BUTTONS */}
                                <View style={styles.buttonContainer}>

                                    {/* VIEW DETAILS */}
                                    <TouchableOpacity
                                        style={styles.viewButton}
                                        onPress={() =>
                                            navigation.navigate(
                                                'MemberProfileDetails',
                                                {
                                                    memberId: item.id,
                                                },
                                            )
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
                                                checkSubscriptionAndNavigate(
                                                    'AddReferral',
                                                    {
                                                        memberId: item.id,
                                                        memberName: item.name,
                                                    },
                                                )
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
                                                checkSubscriptionAndNavigate(
                                                    'AddOneToOne',
                                                    {
                                                        memberId: item.id,
                                                        memberName: item.name,
                                                    },
                                                )
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