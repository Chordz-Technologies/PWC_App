import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonStyles';
import styles from './styles';

const ScheduleScreen = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState('9:00 AM');

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

  const weeks = [
    ['27', '28', '29', '30', '1', '2', '3'],
    ['4', '5', '6', '7', '8', '9', '10'],
    ['11', '12', '13', '14', '15', '16', '17'],
    ['18', '19', '20', '21', '22', '23', '24'],
    ['25', '26', '27', '28', '29', '30', '31'],
  ];

  const handleConfirmMeeting = () => {
    Alert.alert('Success', 'Meeting Confirmed!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[colors.primaryBlue1, colors.primaryBlue2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule 1:1</Text>
      </LinearGradient>

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.label}>Select Member*</Text>

          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={16} color="#888" />
            <TextInput
              placeholder="select member"
              placeholderTextColor="black"
              style={styles.searchInput}
            />
          </View>

          <Text style={styles.label}>Meeting Title</Text>
          <TextInput
            placeholder="e.g., Marketing Strategy Discussion"
            placeholderTextColor="#888"
            style={styles.input}
          />

          <View style={styles.iconLabelRow}>
            <Ionicons name="calendar-outline" size={16} color="#c9a100" />
            <Text style={styles.iconLabelText}>Select Date</Text>
          </View>

          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <Text style={styles.monthText}>March 2026</Text>
              <View style={styles.arrowRow}>
                <TouchableOpacity style={styles.arrowBtn}>
                  <Ionicons name="chevron-back" size={14} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowBtn}>
                  <Ionicons name="chevron-forward" size={14} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.weekRow}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <Text key={index} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>

            {weeks.map((week, rowIndex) => (
              <View key={rowIndex} style={styles.weekRow}>
                {week.map((day, index) => (
                  <TouchableOpacity key={index} style={styles.dayCell}>
                    <Text style={styles.dayText}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.iconLabelRow}>
            <Ionicons name="time-outline" size={16} color="#c9a100" />
            <Text style={styles.iconLabelText}>Select Time</Text>
          </View>

          <View style={styles.timeGrid}>
            {timeSlots.map(time => {
              const active = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeBtn, active && styles.activeTimeBtn]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.timeText, active && styles.activeTimeText]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            placeholder="Write notes..."
            placeholderTextColor="#888"
            multiline
            style={styles.notesInput}
          />

          <TouchableOpacity onPress={handleConfirmMeeting} style={styles.confirmBtnWrapper}>
            <LinearGradient
              colors={[colors.primaryBlue1, colors.primaryBlue2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.confirmBtn}
            >
              <Text style={styles.confirmBtnText}>Confirm Meeting</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomTabBar activeTab="OneToOne" navigation={navigation} />
    </SafeAreaView>
  );
};

export default ScheduleScreen;