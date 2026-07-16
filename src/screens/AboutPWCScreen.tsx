import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/AboutPWCScreenStyle';

const AboutPWCScreen = ({ navigation }: any) => {
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
                        About PWC
                    </Text>
                </LinearGradient>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 18 }}
                >

                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Icon
                                name="people"
                                size={55}
                                color="#4361ee"
                            />
                        </View>

                        <Text style={styles.appTitle}>
                            Pune Women's Club
                        </Text>
                    </View>

                    {/* About */}
                    <View style={styles.card}>
                        <View style={styles.titleRow}>
                            <Icon
                                name="information-circle"
                                size={22}
                                color="#4361ee"
                            />

                            <Text style={styles.cardTitle}>
                                About Us
                            </Text>
                        </View>

                        <Text style={styles.description}>
                            Pune Women's Club (PWC) is a vibrant community of
                            women entrepreneurs and professionals dedicated to
                            building meaningful business relationships,
                            encouraging collaboration, and supporting each
                            other's personal and professional growth.

                            {'\n\n'}

                            Through networking meetings, business referrals,
                            training programs, social activities, and community
                            initiatives, PWC empowers women to achieve success
                            while creating lasting friendships.
                        </Text>
                    </View>

                    {/* Mission */}
                    <View style={styles.card}>
                        <View style={styles.titleRow}>
                            <Icon
                                name="flag"
                                size={22}
                                color="#4361ee"
                            />

                            <Text style={styles.cardTitle}>
                                Our Mission
                            </Text>
                        </View>

                        <Text style={styles.description}>
                            • Encourage women entrepreneurship{"\n"}
                            • Build trusted business networks{"\n"}
                            • Promote leadership and collaboration{"\n"}
                            • Create opportunities through referrals{"\n"}
                            • Inspire lifelong learning and growth
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={styles.card}>
                        <View style={styles.titleRow}>
                            <Icon
                                name="star"
                                size={22}
                                color="#4361ee"
                            />

                            <Text style={styles.cardTitle}>
                                App Features
                            </Text>
                        </View>

                        <View style={styles.featureRow}>
                            <Icon name="calendar-outline" size={20} color="#4361ee" />
                            <Text style={styles.featureText}>
                                Schedule One-to-One Meetings
                            </Text>
                        </View>

                        <View style={styles.featureRow}>
                            <Icon name="people-outline" size={20} color="#4361ee" />
                            <Text style={styles.featureText}>
                                Add Business Referrals
                            </Text>
                        </View>

                        <View style={styles.featureRow}>
                            <Icon name="notifications-outline" size={20} color="#4361ee" />
                            <Text style={styles.featureText}>
                                Instant Notifications
                            </Text>
                        </View>

                        <View style={styles.featureRow}>
                            <Icon name="calendar-number-outline" size={20} color="#4361ee" />
                            <Text style={styles.featureText}>
                                View Upcoming Events & Meetings
                            </Text>
                        </View>

                        <View style={styles.featureRow}>
                            <Icon name="card-outline" size={20} color="#4361ee" />
                            <Text style={styles.featureText}>
                                Easy Online Registration & Payments
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default AboutPWCScreen;