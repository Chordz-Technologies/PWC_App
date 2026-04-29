import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/AppHeader/AppHeader';
import commonStyles from '../../styles/commonstyles';
import styles from './styles';

const categories = [
  'Marketing',
  'Finance',
  'Design',
  'Technology',
  'HR',
  'Legal',
  'Consulting',
  'Content',
];

const AddReferenceScreen = ({ navigation }: any) => {
  const [member, setMember] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSubmit = () => {
    console.log({
      member,
      businessType,
      selectedCategories,
      description,
      link,
    });

    Alert.alert('Reference Submitted ✅');

    navigation.goBack();
  };

  return (
    <View style={commonStyles.safeArea}>
      <AppHeader title="Add Reference"/>

      <ScrollView style={styles.container}>
        {/* MEMBER */}
        <Text style={styles.label}>Select Member*</Text>
        <View style={styles.inputBox}>
          <Icon name="search" size={18} color="#888" />
          <TextInput
            placeholder="select member"
            value={member}
            placeholderTextColor="#999"
            onChangeText={setMember}
            style={styles.input}
          />
        </View>

        {/* BUSINESS TYPE */}
        <Text style={styles.label}>Business Type*</Text>
        <TextInput
          placeholder="Select business type"
          value={businessType}
          placeholderTextColor="#999"
          onChangeText={setBusinessType}
          style={styles.textInput}
        />

        {/* CATEGORY */}
        <Text style={styles.label}>Service Category*</Text>
        <View style={styles.tagContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tag,
                selectedCategories.includes(cat) && styles.tagActive,
              ]}
              onPress={() => toggleCategory(cat)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedCategories.includes(cat) && styles.tagTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.label}>Description*</Text>
        <TextInput
          placeholder="Share your experience working with this member."
          value={description}
          placeholderTextColor="#999"
          onChangeText={setDescription}
          style={[styles.textInput, { height: 100 }]}
          multiline
        />

        {/* LINK */}
        <Text style={styles.label}>Link (Optional)</Text>
        <TextInput
          placeholder="e.g., Portfolio, LinkedIn, Website"
          value={link}
          placeholderTextColor="#999"
          onChangeText={setLink}
          style={styles.textInput}
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Reference</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddReferenceScreen;