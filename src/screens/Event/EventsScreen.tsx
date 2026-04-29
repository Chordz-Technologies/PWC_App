import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import AppHeader from '../../components/AppHeader/AppHeader';
import commonStyles from '../../styles/commonstyles';
import colors from '../../styles/color';
import styles from './styles';
import { RootStackParamList, EventItem } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Events'>;

const EventsScreen = ({ navigation }: Props) => {
  const events: EventItem[] = [
    {
      id: '1',
      title: 'Grand Cake Competition 2026',
      image: require('../../assets/images/event1.png'),
      date: 'Sunday, April 26, 2026',
      time: '12:00 PM – 3:00 PM',
      location: 'Nrutya Dance Academy, Koregaon Park, Pune',
      fee: 700,
      prize: '₹10,000',
      prizeLabel: '1st Prize Cash',
      about: 'Showcase your baking creativity and compete with passionate bakers.',
      rules: [
        'Cake must be prepared at home',
        'No baking at venue allowed',
        'Only one entry per participant',
        'Theme is open',
      ],
      note: '*Trophy & certificate for all participants',
    },
    {
      id: '2',
      title: 'Women Entrepreneurs Meetup',
      image: require('../../assets/images/event2.png'),
      date: 'Tuesday, May 5, 2026',
      time: '5:00 PM – 8:00 PM',
      location: 'Koregaon Park, Pune',
      fee: 500,
      prize: '',
      prizeLabel: '',
      about: 'Meet and network with women entrepreneurs.',
      rules: ['Bring your business card', 'Entry allowed with registration only'],
      note: '*Networking session included',
    },
    {
      id: '3',
      title: 'Khann Paithani Exhibition',
      image: require('../../assets/images/poster1.png'),
      date: 'Sunday, April 26, 2026',
      time: '12:00 PM – 3:00 PM',
      location: 'Nehru Memorial Hall, Pune',
      fee: 0,
      prize: '',
      prizeLabel: '',
      about: 'Explore beautiful traditional Paithani sarees and handloom collections.',
      rules: [],
      note: '',
    }
  ];

  return (
    <View style={commonStyles.safeArea}>
      <AppHeader title="Events" onBack={() => navigation.goBack()} />

      <View style={commonStyles.bodyContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.sectionTitle}>Upcoming Events</Text>

          {events.map(event => (
            <View key={event.id} style={styles.card}>
              <Image source={event.image} style={styles.eventImage} />

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {event.id === '1' ? 'Competition' : 'Networking'}
                </Text>
              </View>

              <Text style={styles.title}>{event.title}</Text>

              <View style={styles.row}>
                <Ionicons name="calendar-outline" size={16} color={colors.primaryBlue1} />
                <Text style={styles.rowText}>{event.date}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="time-outline" size={16} color={colors.primaryBlue1} />
                <Text style={styles.rowText}>{event.time}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="location-outline" size={16} color={colors.primaryBlue1} />
                <Text style={styles.rowText}>{event.location}</Text>
              </View>

              <Text style={styles.entryInfo}>
                Entry Info: {event.fee === 0 ? 'Free' : `Registration Fee: ₹${event.fee}`}
              </Text>

              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => navigation.navigate('EventRegister', { event })}
              >
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.button}>
                  <Text style={styles.buttonText}>Register Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <BottomTabBar activeTab="Events" navigation={navigation} />
    </View>
  );
};

export default EventsScreen;