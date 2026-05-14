import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/MemberProfileDetailsScreenStyle';
import { getMemberDetails } from '../services/authApi';

const MemberProfileDetailsScreen = ({ route, navigation }: any) => {
    const { memberId } = route.params;
    const [loading, setLoading] = useState(true);
    const [member, setMember] = useState<any>(null);
    const [referrals, setReferrals] = useState<any>(null);

    useEffect(() => {
        fetchMemberDetails();
    }, []);

    const fetchMemberDetails = async () => {
        try {
            setLoading(true);
            const res = await getMemberDetails(memberId);
            if (res?.member_details) {
                setMember(res.member_details);
                setReferrals(res.referrals);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const renderRow = (
        icon: string,
        label: string,
        value: any
    ) => (
        <View style={styles.infoRow}>
            <View style={styles.iconBox}>
                <Icon
                    name={icon}
                    size={18}
                    color="#4361ee"
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.label}>
                    {label}
                </Text>

                <Text style={styles.value}>
                    {value || 'N/A'}
                </Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaWrapper>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#4361ee" />
                </View>
            </SafeAreaWrapper>
        );
    }

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        Member Profile
                    </Text>
                </LinearGradient>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 30,
                    }}
                >
                    {/* PROFILE CARD */}
                    <View style={styles.profileCard}>
                        {member?.photo1 ? (
                            <Image
                                source={{
                                    uri: member.photo1
                                }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.defaultAvatar}>
                                <Text style={styles.avatarText}>
                                    {member?.name?.charAt(0)?.toUpperCase()}
                                </Text>
                            </View>
                        )}

                        <Text style={styles.memberName}>
                            {member?.name}
                        </Text>

                        <Text style={styles.memberRole}>
                            {member?.role}
                        </Text>

                        <View style={styles.referralRow}>
                            <View style={styles.referralBox}>
                                <Text style={styles.referralCount}>
                                    {referrals?.given || 0}
                                </Text>

                                <Text style={styles.referralLabel}>
                                    Given
                                </Text>
                            </View>

                            <View style={styles.referralBox}>
                                <Text style={styles.referralCount}>
                                    {referrals?.taken || 0}
                                </Text>

                                <Text style={styles.referralLabel}>
                                    Taken
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* PERSONAL DETAILS */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>
                            Personal Details
                        </Text>
                        {renderRow(
                            'mail-outline',
                            'Email Address',
                            member?.email
                        )}

                        {renderRow(
                            'call-outline',
                            'Phone Number',
                            member?.phone
                        )}

                        {renderRow(
                            'calendar-outline',
                            'Date of Birth',
                            member?.dob
                        )}

                        {renderRow(
                            'location-outline',
                            'Office Address',
                            member?.office_address
                        )}
                    </View>

                    {/* BUSINESS DETAILS */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>
                            Business Details
                        </Text>
                        {renderRow(
                            'business-outline',
                            'Organization Name',
                            member?.org_name
                        )}

                        {renderRow(
                            'briefcase-outline',
                            'Business Category',
                            member?.business_category
                        )}

                        {renderRow(
                            'document-text-outline',
                            'PAN Number',
                            member?.pan_no
                        )}

                        {renderRow(
                            'receipt-outline',
                            'GST Number',
                            member?.gst_no
                        )}
                    </View>

                    {/* MEMBERSHIP DETAILS */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>
                            Membership Details
                        </Text>
                        {renderRow(
                            'calendar-clear-outline',
                            'Joining Date',
                            member?.joining_date
                        )}

                        {renderRow(
                            'calendar-number-outline',
                            'Expiry Date',
                            member?.expiry_date
                        )}

                        {renderRow(
                            'checkmark-circle-outline',
                            'Subscription Status',
                            member?.subscription_status
                        )}

                        {renderRow(
                            'people-outline',
                            'Chapter',
                            member?.chapter
                        )}
                    </View>

                    {/* SOCIAL DETAILS */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>
                            Social Details
                        </Text>
                        {renderRow(
                            'logo-facebook',
                            'Facebook',
                            member?.facebook
                        )}

                        {renderRow(
                            'logo-linkedin',
                            'LinkedIn',
                            member?.linkedin
                        )}

                        {renderRow(
                            'globe-outline',
                            'Website',
                            member?.personal_website
                        )}

                        {renderRow(
                            'share-social-outline',
                            'Social Media',
                            member?.social_media
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default MemberProfileDetailsScreen;