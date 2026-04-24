import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/commonStyles';

const PersonalDetailsForm = ({ form, setForm }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.formHeading}>Personal Details</Text>

      <Text style={styles.label}>Full Name*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#777"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />

      <Text style={styles.label}>Email*</Text>
      <TextInput
        style={styles.input}
        placeholder="your.email@gmail.com"
        placeholderTextColor="#777"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />

      <Text style={styles.label}>Phone Number*</Text>
      <TextInput
        style={styles.input}
        placeholder="+91 00000 00000"
        placeholderTextColor="#777"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
      />
    </View>
  );
};

export default PersonalDetailsForm;