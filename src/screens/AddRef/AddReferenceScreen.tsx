import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AppHeader from '../../components/AppHeader/AppHeader';
import commonStyles from '../../styles/commonstyles';
import styles from './styles';

const AddReferenceScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [note, setNote] = useState('');

  return (
    <View style={commonStyles.safeArea}>
      <AppHeader title="Add Reference" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          placeholder="Enter name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Business*</Text>
        <TextInput
          placeholder="Enter business name"
          placeholderTextColor="#888"
          value={business}
          onChangeText={setBusiness}
          style={styles.input}
        />

        <Text style={styles.label}>Reference Note*</Text>
        <TextInput
          placeholder="Write reference note"
          placeholderTextColor="#888"
          value={note}
          onChangeText={setNote}
          multiline
          style={styles.noteInput}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit Reference</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddReferenceScreen;