import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

type Props = {
  form: any;
  setForm: (data: any) => void;
};

const PaymentSection = ({ form, setForm }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Payment Method</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setForm({ ...form, method: 'card' })}
      >
        <Text>💳 Credit Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => setForm({ ...form, method: 'upi' })}
      >
        <Text>📱 UPI</Text>
      </TouchableOpacity>

      {form.method === 'card' && (
        <>
          <TextInput
            placeholder="Card Holder Name"
            style={styles.input}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <TextInput
            placeholder="Card Number"
            style={styles.input}
            keyboardType="numeric"
          />
        </>
      )}
    </View>
  );
};

export default PaymentSection;