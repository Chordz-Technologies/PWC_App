import React from 'react';
import { View, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/commonStyles';
import colors from '../styles/colors';

const EventInfoCard = ({ event }) => {
  return (
    <View style={styles.card}>
      <View style={styles.eventTopRow}>
        <Image source={event.image} style={styles.eventImage} />

        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={15} color={colors.subText} />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={15} color={colors.subText} />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={15} color={colors.subText} />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.priceRow}>
        <View style={styles.priceBox}>
          <Ionicons name="trophy-outline" size={18} color={colors.primaryBlue1} />
          <View style={styles.priceTextWrap}>
            <Text style={styles.priceTitle}>Win {event.prize}</Text>
            <Text style={styles.priceSub}>{event.prizeLabel}</Text>
          </View>
        </View>

        <View style={styles.priceBox}>
          <Ionicons name="card-outline" size={18} color={colors.primaryBlue1} />
          <View style={styles.priceTextWrap}>
            <Text style={styles.priceTitle}>Entry Fee</Text>
            <Text style={styles.priceSub}>₹{event.fee}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionHeading}>About this Event</Text>
      <Text style={styles.descText}>{event.about}</Text>

      <View style={styles.rulesBox}>
        <Text style={styles.rulesTitle}>Rules & Guidelines</Text>
        {event.rules?.map((rule, index) => (
          <Text key={index} style={styles.ruleText}>
            • {rule}
          </Text>
        ))}
      </View>

      <Text style={styles.noteText}>{event.note}</Text>
    </View>
  );
};

export default EventInfoCard;