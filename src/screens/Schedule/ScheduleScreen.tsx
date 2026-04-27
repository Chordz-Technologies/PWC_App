import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/AppHeader/AppHeader';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonstyles';
import styles from './styles';

const ScheduleScreen = ({ navigation }: any) => {
  return (
    <View style={commonStyles.safeArea}>
      
      {/* Header */}
      <AppHeader title="Schedule" onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Title */}
        <Text style={styles.title}>Upcoming Meetings</Text>

        {/* Cards */}
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.card}>
            
            <View style={styles.iconBox}>
              <Ionicons name="calendar-outline" size={22} color="#4A6CF7" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                Business 1:1 Meeting
              </Text>

              <Text style={styles.text}>Date: 26 April 2026</Text>
              <Text style={styles.text}>Time: 12:00 PM - 1:00 PM</Text>
              <Text style={styles.text}>
                Location: Koregaon Park, Pune
              </Text>
            </View>

          </View>
        ))}

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewMeetingScreen')}
        >
          <Text style={styles.buttonText}>
            Schedule New Meeting
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomTabBar activeTab="Schedule" navigation={navigation} />
    </View>
  );
};

export default ScheduleScreen;