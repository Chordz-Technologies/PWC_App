import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import styles from './styles';

type Props = {
  image?: ImageSourcePropType;
  title: string;
  name: string;
  time: string;
};

const MeetingCard = ({ image, title, name, time }: Props) => {
  return (
    <View style={styles.card}>
      {image ? (
        <Image source={image} style={styles.image} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default MeetingCard;