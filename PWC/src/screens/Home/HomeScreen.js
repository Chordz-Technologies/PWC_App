import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import MeetingCard from '../../components/MeetingCard/MeetingCard';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import styles from './styles';

const posters = [
  require('../../assets/images/poster1.png'),
  require('../../assets/images/poster2.png'),
];

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === posters.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);

      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <LinearGradient
        colors={[colors.primaryBlue1, colors.primaryBlue2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.userName}>Akshay Bansode</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={commonStyles.bodyContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.posterWrapper}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {posters.map((item, index) => (
                <Image key={index} source={item} style={[styles.poster, { width }]} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.dotContainer}>
            {posters.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>

          <Text style={commonStyles.sectionTitle}>Explore</Text>

          <View style={styles.exploreRow}>
            <TouchableOpacity
              style={styles.cardWidth}
              onPress={() => navigation.navigate('Schedule')}
            >
              <ExploreCard
                iconName="calendar-outline"
                title="Schedule 1:1"
                subtitle="Plan meaningful business meetings"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardWidth}>
              <ExploreCard
                iconName="book-outline"
                title="Add Reference"
                subtitle="Recommend reliable members easily"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.meetingHeader}>
            <Text style={styles.meetingTitle}>Upcoming Meetings</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <MeetingCard
            image={require('../../assets/images/user1.png')}
            title="Marketing Strategy"
            name="Priya Deskmukh"
            time="Apr 10 at 10:00 AM"
          />

          <MeetingCard
            image={require('../../assets/images/user2.png')}
            title="Creative Studio"
            name="Amit Gaikwad"
            time="Apr 10 at 10:00 AM"
          />
        </ScrollView>
      </View>

      <BottomTabBar activeTab="Home" navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;