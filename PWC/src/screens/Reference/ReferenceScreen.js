import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import styles from './styles';

const ReferenceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <LinearGradient
        colors={[colors.primaryBlue1, colors.primaryBlue2]}
        style={commonStyles.header}
      >
     <View style={commonStyles.headerLeft}></View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={commonStyles.headerTitle}>References</Text>
      </LinearGradient>

      <View style={commonStyles.bodyContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['All', 'Marketing', 'Finance', 'Design', 'Tech'].map(item => (
              <TouchableOpacity key={item} style={styles.filterBtn}>
                <Text style={styles.filterText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.card}>
            <View style={styles.topRow}>
              <Image
                source={require('../../assets/images/user1.png')}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Marketing Strategy</Text>
                <Text style={styles.subtitle}>Priya Deskmukh</Text>
              </View>

              <Ionicons name="bookmark-outline" size={20} color="#333" />
            </View>

            <Text style={styles.description}>
              Priya helped us 3x our social media engagement in just 2 months.
            </Text>

            <View style={styles.tagRow}>
              <Text style={styles.tag}>Marketing</Text>
              <Text style={styles.tag}>Social Media</Text>
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.recommendText}>Recommended by Kavya</Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#4361ee" />
                <Text style={styles.rating}>4.8</Text>
                <Ionicons name="heart-outline" size={14} />
                <Text style={styles.rating}>20</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.topRow}>
              <Image
                source={require('../../assets/images/user2.png')}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Sneha Patel</Text>
                <Text style={styles.subtitle}>Creative Studio</Text>
              </View>

              <Ionicons name="bookmark-outline" size={20} color="#333" />
            </View>

            <Text style={styles.description}>
              Sneha created a beautiful brand identity for our startup.
            </Text>

            <View style={styles.tagRow}>
              <Text style={styles.tag}>Design</Text>
              <Text style={styles.tag}>Branding</Text>
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.recommendText}>Recommended by Meera</Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#4361ee" />
                <Text style={styles.rating}>4.7</Text>
                <Ionicons name="heart-outline" size={14} />
                <Text style={styles.rating}>25</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.topRow}>
              <Image
                source={require('../../assets/images/user2.png')}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Samruddhi Joshi</Text>
                <Text style={styles.subtitle}>Creative Studio</Text>
              </View>

              <Ionicons name="bookmark-outline" size={20} color="#333" />
            </View>

            <Text style={styles.description}>
              Sneha created a beautiful brand identity for our startup.
            </Text>

            <View style={styles.tagRow}>
              <Text style={styles.tag}>Design</Text>
              <Text style={styles.tag}>Branding</Text>
            </View>

            <View style={styles.bottomRow}>
              <Text style={styles.recommendText}>Recommended by Meera</Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#4361ee" />
                <Text style={styles.rating}>4.7</Text>
                <Ionicons name="heart-outline" size={14} />
                <Text style={styles.rating}>25</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddReference')}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <BottomTabBar activeTab="Reference" navigation={navigation} />
    </SafeAreaView>
  );
};

export default ReferenceScreen;