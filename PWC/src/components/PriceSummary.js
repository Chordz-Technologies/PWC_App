import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/commonStyles';

const PriceSummary = ({ fee }) => {
  return (
    <View style={styles.card}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Entry fee</Text>
        <Text style={styles.summaryValue}>₹{fee}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total</Text>
        <Text style={styles.summaryValue}>₹{fee}</Text>
      </View>
    </View>
  );
};

export default PriceSummary;