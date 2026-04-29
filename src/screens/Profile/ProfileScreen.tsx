import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../components/AppHeader/AppHeader';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonstyles';
import styles from './styles';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View style={commonStyles.safeArea}>
      
      {/* HEADER */}
      <AppHeader title="Profile" onBack={() => navigation.goBack()} />

      <View style={commonStyles.bodyContainer}>

        {/* CARD */}
        <View style={styles.card}>
          
          {/* PROFILE IMAGE */}
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil" size={14} color="#000" />
            </TouchableOpacity>
          </View>

          {/* NAME */}
          <Text style={styles.name}>Akshay Bansode</Text>

          {/* ROLE */}
          <Text style={styles.role}>
            Managing Director at Chordz Technologies
          </Text>

          <Text style={styles.role}>Software Solutions Expert</Text>

          {/* STATS */}
          <Text style={styles.stats}>
            <Text style={styles.bold}>4.8</Text> (45 reviews)
          </Text>

          {/* DESCRIPTION */}
          <Text style={styles.desc}>
            Helping businesses automate operations and improve productivity
            through smart software solutions. Specialized in B2B systems and
            workflow optimization.
          </Text>

          {/* TAGS */}
          <View style={styles.tagRow}>
            <Text style={styles.tag}>Automation</Text>
            <Text style={styles.tag}>Software Development</Text>
          </View>
        </View>

        {/* SETTINGS BUTTON */}
        <TouchableOpacity style={styles.settingsBtn}>
          <Icon name="settings-outline" size={16} />
          <Text style={styles.settingsText}> Settings & Privacy</Text>
        </TouchableOpacity>

      </View>

      <BottomTabBar activeTab="Profile" navigation={navigation} />
    </View>
  );
};

export default ProfileScreen;