import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

type Props = {
  fee: number;
};

const PriceSummary = ({ fee }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text>Entry Fee</Text>
        <Text>₹{fee}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>₹{fee}</Text>
      </View>
    </View>
  );
};

export default PriceSummary;