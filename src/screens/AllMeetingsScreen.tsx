import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/AllMeetingsScreenStyle';

const AllMeetingsScreen = ({ navigation, route }: any) => {
    const meetings = route.params?.meetings || [];
    const formatDateTime = (date: string, time: string) => {
        const d = new Date(`${date}T${time}`);
        const formattedDate = d.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
        });

        const formattedTime = d.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedDate} at ${formattedTime}`;
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Upcoming Meetings</Text>
                </LinearGradient>

                <ScrollView
                    contentContainerStyle={{
                        padding: 15,
                        paddingBottom: 30,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {meetings.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No Meetings Found
                        </Text>
                    ) : (
                        meetings.map((item: any) => (
                            <View
                                key={item.id}
                                style={styles.card}
                            >
                                <View style={styles.cardContent}>

                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={styles.avatarIcon}>
                                            <Icon
                                                name="person"
                                                size={22}
                                                color="#4361ee"
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flex: 1,
                                                marginLeft: 12,
                                            }}
                                        >
                                            <Text style={styles.meetingTitle}>
                                                {item.title || 'Meeting'}
                                            </Text>

                                            <Text style={styles.memberName}>
                                                {item.person2}
                                            </Text>

                                            <Text style={styles.meetingTime}>
                                                {formatDateTime(item.date, item.time)}
                                            </Text>

                                            <Text style={styles.venue}>
                                                📍 {item.venue}
                                            </Text>
                                        </View>

                                    </View>

                                    <TouchableOpacity
                                        style={styles.addVisitorButton}
                                        onPress={() =>
                                            navigation.navigate('AddVisitor')
                                        }
                                    >
                                        <Icon
                                            name="person-add-outline"
                                            size={18}
                                            color="#fff"
                                        />

                                        <Text style={styles.addVisitorText}>
                                            Add Visitor
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper >
    );
};

export default AllMeetingsScreen;