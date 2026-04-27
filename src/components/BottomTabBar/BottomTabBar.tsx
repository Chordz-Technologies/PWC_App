import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type Props = {
  activeTab: string;
  navigation: any;
};

const BottomTabBar = ({ activeTab, navigation }: Props) => {
  const tabs = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Schedule', icon: 'calendar-outline' },
    { name: 'Reference', icon: 'book-outline' },
    { name: 'Events', icon: 'calendar-number-outline' },
    { name: 'Profile', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
          >
            <Ionicons
              name={tab.icon}
              size={22}
              color={active ? '#4A6CF7' : '#777'}
            />
            <Text style={[styles.label, active && styles.active]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;