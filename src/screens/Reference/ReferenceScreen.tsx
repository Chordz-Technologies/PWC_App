import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/AppHeader/AppHeader';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonstyles';
import styles from './styles';

const data = [
  {
    id: '1',
    title: 'Marketing Strategy',
    company: 'Piya Deshmukh',
    desc: 'Piya helped us 3x our social media engagement in just 2 months.',
    category: ['Marketing', 'Social Media'],
    rating: 4.8,
    likes: 20,
    comments: 3,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    title: 'Sneha Patel',
    company: 'Creative Studio',
    desc: 'Sneha created a beautiful brand identity for our startup.',
    category: ['Design', 'Branding'],
    rating: 4.7,
    likes: 25,
    comments: 5,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

const ReferencesScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.sub}>{item.company}</Text>
        </View>

        <Icon name="bookmark-outline" size={20} />
      </View>

      <Text style={styles.desc}>{item.desc}</Text>

      <View style={styles.tagRow}>
        {item.category.map((c: string, i: number) => (
          <Text key={i} style={styles.tag}>
            {c}
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>⭐ {item.rating}</Text>
        <Text style={styles.footerText}>♡ {item.likes}</Text>
        <Text style={styles.footerText}>💬 {item.comments}</Text>
      </View>
    </View>
  );

  return (
    <View style={commonStyles.safeArea}>
      {/* HEADER */}
      <AppHeader title="References" />

      {/* MAIN CONTENT */}
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />

        {/* FLOAT BUTTON */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddRef')}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* BOTTOM TAB */}
      <BottomTabBar activeTab="Reference" navigation={navigation} />
    </View>
  );
};

export default ReferencesScreen;