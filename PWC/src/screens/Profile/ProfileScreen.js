import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import colors from '../../styles/colors';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar backgroundColor="#2F49E7" barStyle="light-content" />

      <LinearGradient
        colors={['#0460d9', '#3C3FE6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={styles.headerRightSpace} />
      </LinearGradient>

      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.image}
            />

            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="create-outline" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>Akshay Bansode</Text>
          <Text style={styles.role}>
            Managing Director at Chordz Technologies
          </Text>
          <Text style={styles.role}>Software Solutions Expert</Text>

          <Text style={styles.rating}>⭐ 4.8 (45 reviews)</Text>

          <Text style={styles.description}>
            Helping businesses automate operations and improve productivity
            through smart software solutions.
          </Text>

          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Automation</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Software Development</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.settings}>
          <Ionicons name="settings-outline" size={20} color="#222" />
          <Text style={styles.settingsText}>Settings & Privacy</Text>
        </TouchableOpacity>
      </View>

      <BottomTabBar activeTab="Profile" navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProfileScreen;