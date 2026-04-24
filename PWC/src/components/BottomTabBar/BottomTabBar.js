import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const BottomTabBar = ({ activeTab = 'Home', navigation }) => {
  const tabs = [
    { key: 'Home', icon: 'home-outline', label: 'Home', screen: 'Home' },
    { key: 'OneToOne', icon: 'people-outline', label: '1:1', screen: 'Schedule' },
    { key: 'Reference', icon: 'book-outline', label: 'Reference', screen: 'Reference' },
    { key: 'Events', icon: 'calendar-outline', label: 'Events', screen: 'Events' },
    { key: 'Profile', icon: 'person-outline', label: 'Profile', screen: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(item => {
        const active = activeTab === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={styles.tabItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={active ? '#d8a517' : '#333'}
            />
            <Text style={[styles.label, active && styles.activeLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;