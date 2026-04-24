import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/commonStyles';

const PaymentSection = ({ form, setForm }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.formHeading}>Payment Method</Text>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => setForm({ ...form, paymentMethod: 'card' })}
      >
        <Text style={styles.paymentOptionText}>💳  Credit Card</Text>
        <Text style={styles.radioCircle}>
          {form.paymentMethod === 'card' ? '◉' : '○'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => setForm({ ...form, paymentMethod: 'upi' })}
      >
        <Text style={styles.paymentOptionText}>📱  UPI</Text>
        <Text style={styles.radioCircle}>
          {form.paymentMethod === 'upi' ? '◉' : '○'}
        </Text>
      </TouchableOpacity>

      {form.paymentMethod === 'card' && (
        <>
          <View style={styles.divider} />

          <Text style={styles.label}>Card holder Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name here"
            placeholderTextColor="#777"
            value={form.cardName}
            onChangeText={(text) => setForm({ ...form, cardName: text })}
          />

          <Text style={styles.label}>Card Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor="#777"
            keyboardType="number-pad"
            value={form.cardNumber}
            onChangeText={(text) => setForm({ ...form, cardNumber: text })}
          />

          <View style={styles.expiryCvvRow}>
            <View style={styles.halfBox}>
              <Text style={styles.label}>Expiration Date *</Text>
              <TextInput
                style={styles.input}
                placeholder="--/--"
                placeholderTextColor="#777"
                value={form.expiry}
                onChangeText={(text) => setForm({ ...form, expiry: text })}
              />
            </View>

            <View style={styles.halfBox}>
              <Text style={styles.label}>CVV*</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                placeholderTextColor="#777"
                keyboardType="number-pad"
                secureTextEntry
                value={form.cvv}
                onChangeText={(text) => setForm({ ...form, cvv: text })}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default PaymentSection;