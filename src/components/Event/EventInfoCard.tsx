import React from 'react';
import { View, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EventItem } from '../../navigation/types';
import styles from './styles';

type Props = {
  event: EventItem;
};

const EventInfoCard = ({ event }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image source={event.image} style={styles.image} />

        <View style={styles.infoBox}>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.rowText}>{event.date}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.rowText}>{event.time}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.rowText}>{event.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.priceRow}>
        <View style={styles.priceBox}>
          <Ionicons name="trophy-outline" size={22} color="#4361ee" />
          <View>
            <Text style={styles.priceTitle}>Win {event.prize}</Text>
            <Text style={styles.priceSub}>{event.prizeLabel}</Text>
          </View>
        </View>

        <View style={styles.priceBox}>
          <Ionicons name="card-outline" size={22} color="#4361ee" />
          <View>
            <Text style={styles.priceTitle}>Entry Fee</Text>
            <Text style={styles.priceSub}>₹{event.fee}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.heading}>About this Event</Text>
      <Text style={styles.desc}>{event.about}</Text>

      <View style={styles.rulesBox}>
        <Text style={styles.rulesTitle}>Rules & Guidelines</Text>
        {event.rules.map((rule, index) => (
          <Text key={index} style={styles.ruleText}>• {rule}</Text>
        ))}
      </View>

      <Text style={styles.note}>{event.note}</Text>
    </View>
  );
};

export default EventInfoCard;