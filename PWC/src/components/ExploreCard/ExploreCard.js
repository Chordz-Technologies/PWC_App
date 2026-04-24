import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const ExploreCard = ({ iconName, title, subtitle }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={iconName} size={22} color="#0b63c9" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default ExploreCard;