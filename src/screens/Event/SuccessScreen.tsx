import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import styles from '../Event/successStyles';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RegistrationSuccess'>;

const RegistrationSuccessScreen = ({ navigation, route }: Props) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name="checkmark" size={70} color="#fff" />
      </View>

      <Text style={styles.title}>Registration Successful</Text>
      <Text style={styles.subtitle}>You're all set for the event</Text>

      <View style={styles.card}>
        <Text style={styles.eventTitle}>{event.title}</Text>

        <Text style={styles.info}>📅 {event.date}</Text>
        <Text style={styles.info}>⏰ {event.time}</Text>
        <Text style={styles.info}>📍 {event.location}</Text>

        <View style={styles.nextBox}>
          <Text style={styles.nextTitle}>What's Next?</Text>
          <Text style={styles.nextText}>• A confirmation email has been sent to your registered email</Text>
          <Text style={styles.nextText}>• You can view your ticket in the Events section</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.smallBtn}>
            <Text>⬇ Download Ticket</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallBtn}>
            <Text>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('Events')}
      >
        <Text style={styles.primaryText}>View All Events</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.secondaryText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationSuccessScreen;