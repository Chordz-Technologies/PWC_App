import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import EventInfoCard from '../../../components/EventInfoCard';
import PersonalDetailsForm from '../../../components/PersonalDetailsForm';
import PaymentSection from '../../../components/PaymentSection';
import PriceSummary from '../../../components/PriceSummary';

const EventRegisterScreen = ({ route, navigation }) => {
  const { event } = route.params;

  const [form, setForm] = useState({
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

    if (form.paymentMethod === 'card') {
      if (!form.cardName || !form.cardNumber || !form.expiry || !form.cvv) {
        Alert.alert('Validation', 'Please fill all card details');
        return;
      }
    }

    Alert.alert('Success', `${event.title} registration completed successfully`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register for Event</Text>
      </View>

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