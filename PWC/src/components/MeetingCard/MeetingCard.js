import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const MeetingCard = ({ image, title, name, time }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default MeetingCard;