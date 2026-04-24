import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import styles from './styles';

const EventsScreen = ({ navigation }) => {
  const cakeEvent = {
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
  };

  const exhibitionEvent = {
    id: '2',
    title: 'Khann Paithani Exhibition',
    image: require('../../assets/images/poster1.png'),
    date: 'Sunday, April 26, 2026',
    time: '12:00 PM – 3:00 PM',
    location: 'Nehru Memorial Hall, Pune',
    fee: 700,
    prize: 'Special Showcase',
    prizeLabel: 'Exhibition Entry',
    about: 'Explore and participate in a beautiful Paithani exhibition event.',
    rules: [
      'Valid registration required',
      'Only registered participants allowed',
      'Entry pass must be shown',
    ],
    note: '*Certificate for all participants',
  };

  const meetupEvent = {
    id: '3',
    title: 'Women Entrepreneurs Meetup',
    image: require('../../assets/images/event2.png'),
    date: 'Tuesday, 5 May, 2026',
    time: '5:00 PM – 8:00 PM',
    location: 'Koregaon Park, Pune',
    fee: 500,
    prize: 'Networking Event',
    prizeLabel: 'Meetup Access',
    about: 'Connect with women entrepreneurs, share ideas, and grow your network.',
    rules: ['Registration required', 'Bring valid ID', 'Be on time'],
    note: '*Participation access for registered members',
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar backgroundColor="#4361ee" barStyle="light-content" />

      <LinearGradient
        colors={['#4361ee', '#3f37c9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Events</Text>
      </LinearGradient>

      <View style={commonStyles.bodyContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.sectionTitle}>Upcoming Events</Text>

          <View style={styles.card}>
            <Image
              source={require('../../assets/images/event1.png')}
              style={styles.eventImage}
            />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>Competition</Text>
            </View>

            <Text style={styles.title}>Grand Cake Competition 2026</Text>

            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>Sunday, April 26, 2026</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="time-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>12:00 PM – 3:00 PM</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>
                Nrutya Dance Academy, Koregaon Park, Pune
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="people-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>35 attending</Text>
            </View>

            <Text style={styles.entryInfo}>
              Entry Info: Registration Fee: ₹700
            </Text>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate('EventRegister', { event: cakeEvent })
              }
            >
              <LinearGradient
                colors={['#4361ee', '#3f37c9']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.posterCard}>
            <Image
              source={require('../../assets/images/poster1.png')}
              style={styles.posterImage}
            />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>Exhibition</Text>
            </View>

            <Text style={styles.title}>Khann Paithani Exhibition</Text>

            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>Sunday, April 26, 2026</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="time-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>12:00 PM – 3:00 PM</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>Nehru Memorial Hall, Pune</Text>
            </View>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate('EventRegister', {
                  event: exhibitionEvent,
                })
              }
            >
              <LinearGradient
                colors={['#4361ee', '#3f37c9']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.posterCard}>
            <Image
              source={require('../../assets/images/event2.png')}
              style={styles.posterImage}
            />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>Networking</Text>
            </View>

            <Text style={styles.title}>Women Entrepreneurs Meetup</Text>

            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>Tuesday, 5 May, 2026</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="time-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>5:00 PM – 8:00 PM</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>Koregaon Park, Pune</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="people-outline" size={16} color={colors.primaryBlue1} />
              <Text style={styles.rowText}>25 attending</Text>
            </View>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() =>
                navigation.navigate('EventRegister', { event: meetupEvent })
              }
            >
              <LinearGradient
                colors={['#4361ee', '#3f37c9']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <BottomTabBar activeTab="Events" navigation={navigation} />
    </SafeAreaView>
  );
};

export default EventsScreen;