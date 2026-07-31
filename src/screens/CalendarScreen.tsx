import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/CalendarScreenStyle';

const CalendarScreen = ({ navigation }: any) => {
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
                        Calendar
                    </Text>
                </LinearGradient>

                <View style={styles.cardContainer}>

                    {/* Regular Meetings */}

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('RegularMeetings')
                        }
                    >
                        <View style={styles.iconCircle}>
                            <Icon
                                name="people"
                                size={36}
                                color="#4361ee"
                            />
                        </View>

                        <Text style={styles.cardTitle}>
                            Regular Meetings
                        </Text>

                        <Text style={styles.cardSubtitle}>
                            View all scheduled meetings
                        </Text>

                        <Icon
                            name="arrow-forward-circle"
                            size={26}
                            color="#4361ee"
                        />
                    </TouchableOpacity>

                    {/* Event Calendar */}

                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate('Events')
                        }
                    >
                        <View style={styles.iconCircle}>
                            <Icon
                                name="calendar"
                                size={36}
                                color="#4361ee"
                            />
                        </View>

                        <Text style={styles.cardTitle}>
                            Event Calendar
                        </Text>

                        <Text style={styles.cardSubtitle}>
                            Explore all upcoming events
                        </Text>

                        <Icon
                            name="arrow-forward-circle"
                            size={26}
                            color="#4361ee"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaWrapper>
    );
};

export default CalendarScreen;