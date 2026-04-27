import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../components/AppHeader/AppHeader';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonstyles';
import styles from './styles';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View style={commonStyles.safeArea}>
      <AppHeader title="Profile" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarBox}>
            <Ionicons name="person-circle-outline" size={92} color="#000" />

            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="create-outline" size={22} color="#111" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>Akshay Bansode</Text>

          <Text style={styles.role}>
            Managing Director at Chordz Technologies
          </Text>

          <Text style={styles.role}>Software Solutions Expert</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>4.8 (45 reviews)</Text>
          </View>

          <Text style={styles.description}>
            Helping businesses automate operations and improve productivity
            through smart software solutions.
          </Text>

          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Automation</Text>
            </View>

            <View style={styles.tagLarge}>
              <Text style={styles.tagText}>Software Development</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.settingBox}>
          <Ionicons name="settings-outline" size={28} color="#111" />
          <Text style={styles.settingText}>Settings & Privacy</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomTabBar activeTab="Profile" navigation={navigation} />
    </View>
  );
};

export default ProfileScreen;