import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../components/AppHeader/AppHeader';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonstyles';
import { RootStackParamList } from '../../navigation/types';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const posters: ImageSourcePropType[] = [
  require('../../assets/images/poster1.png'),
  require('../../assets/images/poster2.png'),
];

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: Props) => {
  const sliderRef = useRef<FlatList<ImageSourcePropType>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % posters.length;

      sliderRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 2000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <View style={commonStyles.safeArea}>
      <AppHeader title="Home" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.name}>Welcome to Pune Women’s Club</Text>

        <FlatList
          ref={sliderRef}
          data={posters}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.poster} />
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / (width - 32),
            );
            setActiveIndex(index);
          }}
        />

        <View style={styles.dotsContainer}>
          {posters.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Explore</Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Schedule')}
          >
            <Ionicons name="calendar-outline" size={28} color="#4361ee" />
            <Text style={styles.cardTitle}>Schedule 1:1</Text>
            <Text style={styles.cardText}>Plan business meetings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Reference')}
          >
            <Ionicons name="book-outline" size={28} color="#4361ee" />
            <Text style={styles.cardTitle}>Reference</Text>
            <Text style={styles.cardText}>View member references</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Events')}
          >
            <Ionicons name="calendar-number-outline" size={28} color="#4361ee" />
            <Text style={styles.cardTitle}>Events</Text>
            <Text style={styles.cardText}>Register for events</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-outline" size={28} color="#4361ee" />
            <Text style={styles.cardTitle}>Profile</Text>
            <Text style={styles.cardText}>Manage your account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomTabBar activeTab="Home" navigation={navigation as any} />
    </View>
  );
};

export default HomeScreen;