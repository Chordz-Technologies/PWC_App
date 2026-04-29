import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppHeader from '../../components/AppHeader/AppHeader';
import EventInfoCard from '../../components/Event/EventInfoCard';
import PersonalDetailsForm from '../../components/Personal/PersonalDetailsForm';
import PaymentSection from '../../components/Payment/PaymentSection';
import PriceSummary from '../../components/Price/PriceSummary';
import { RootStackParamList } from '../../navigation/types';
import styles from './Regstyles';



type Props = NativeStackScreenProps<RootStackParamList, 'EventRegister'>;

type FormState = {
  name: string;
  email: string;
  phone: string;
  paymentMethod: 'card' | 'upi';
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const EventRegisterScreen = ({ route, navigation }: Props) => {
  const { event } = route.params;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleRegister = () => {
    if (!form.name || !form.email || !form.phone) {
      Alert.alert('Validation', 'Please fill all personal details');
      return;
    }

   navigation.navigate('RegistrationSuccess', { event });
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Register for Event" onBack={() => navigation.goBack()} />

      <ScrollView
            showsVerticalScrollIndicator={false}
             contentContainerStyle={{ paddingBottom: 120 }}
        >
        <View style={styles.content}>
          <EventInfoCard event={event} />
          <PersonalDetailsForm form={form} setForm={setForm} />
          <PaymentSection form={form} setForm={setForm} />
          <PriceSummary fee={event.fee} />

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Pay & Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventRegisterScreen;