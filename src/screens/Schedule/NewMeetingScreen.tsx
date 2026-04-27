import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/AppHeader/AppHeader';
import commonStyles from '../../styles/commonstyles';
import styles from './newMeetingStyles';

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
];

const NewMeetingScreen = ({ navigation }: any) => {
  const [selectedTime, setSelectedTime] = useState('9:00 AM');
  const [notes, setNotes] = useState('');

  return (
    <View style={commonStyles.safeArea}>
      <AppHeader title="New Meeting" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Select Member*</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={25} color="#666" />
          <TextInput
            placeholder="select member"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.label}>Meeting Title</Text>

        <TextInput
          placeholder="e.g., Marketing Strategy Discussion"
          placeholderTextColor="#888"
          style={styles.input}
        />

        <View style={styles.sectionRow}>
          <Ionicons name="calendar-outline" size={22} color="#1687E8" />
          <Text style={styles.sectionTitle}>Select Date</Text>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.monthRow}>
            <Text style={styles.monthText}>March 2026</Text>

            <View style={styles.arrowRow}>
              <TouchableOpacity style={styles.arrowCircle}>
                <Ionicons name="chevron-back" size={28} color="#aaa" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowCircle}>
                <Ionicons name="chevron-forward" size={28} color="#aaa" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekRow}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <Text key={day} style={styles.weekText}>{day}</Text>
            ))}
          </View>

          <View style={styles.dateGrid}>
            {[27, 28, 29, 30].map((date) => (
              <Text key={`old-${date}`} style={styles.oldDate}>{date}</Text>
            ))}

            {Array.from({ length: 31 }, (_, index) => index + 1).map((date) => (
              <Text key={date} style={styles.dateText}>{date}</Text>
            ))}
          </View>
        </View>

        <View style={styles.sectionRow}>
          <Ionicons name="time-outline" size={22} color="#1687E8" />
          <Text style={styles.sectionTitle}>Select Time</Text>
        </View>

        <View style={styles.timeGrid}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.activeTimeButton,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Notes (Optional)</Text>

        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          maxLength={250}
          style={styles.notesInput}
        />

        <Text style={styles.countText}>{notes.length}/250</Text>

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Confirm Meeting</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewMeetingScreen;