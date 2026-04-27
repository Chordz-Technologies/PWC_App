import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

type Props = {
  form: any;
  setForm: (data: any) => void;
};

const PersonalDetailsForm = ({ form, setForm }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Personal Details</Text>
         <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#777"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

         <TextInput
              style={styles.input}
              placeholder="your.email@gmail.com"
              placeholderTextColor="#777"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
         />

        <TextInput
              style={styles.input}
              placeholder="+91 00000 00000"
              placeholderTextColor="#777"
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
        />
    </View>
  );
};

export default PersonalDetailsForm;