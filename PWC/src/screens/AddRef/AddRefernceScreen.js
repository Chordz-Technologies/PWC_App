import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
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

const AddReferenceScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <LinearGradient
        colors={[colors.primaryBlue1, colors.primaryBlue2]}
        style={commonStyles.header}
      >
        <View style={commonStyles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={commonStyles.headerTitle}>Add Reference</Text>
        </View>
      </LinearGradient>

      <View style={commonStyles.bodyContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.label}>Select Member*</Text>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={16} color="#777" />
            <TextInput
              placeholder="select member"
              placeholderTextColor="#777"
              style={styles.searchInput}
            />
          </View>

          <Text style={styles.label}>Business Type*</Text>
          <View style={styles.dropdownBox}>
            <TextInput
              placeholder="Select business type"
              placeholderTextColor="#777"
              style={styles.dropdownInput}
              editable={false}
            />
            <Ionicons name="chevron-down-outline" size={18} color="#555" />
          </View>

          <Text style={styles.label}>Service Category*</Text>
          <View style={styles.categoryContainer}>
            {categories.map(item => {
              const active = selectedCategory === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoryBtn,
                    active && styles.activeCategoryBtn,
                  ]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.activeCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Description*</Text>
          <TextInput
            placeholder="Share your experience working with this member.."
            placeholderTextColor="#777"
            multiline
            style={styles.descriptionInput}
          />

          <Text style={styles.label}>Link (Optional)</Text>
          <TextInput
            placeholder="e.g., Portfolio, LinkedIn, Website"
            placeholderTextColor="#777"
            style={styles.linkInput}
          />

          <TouchableOpacity style={styles.buttonWrapper}>
            <LinearGradient
              colors={[colors.primaryBlue1, colors.primaryBlue2]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Submit Reference</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <BottomTabBar activeTab="Reference" navigation={navigation} />
    </SafeAreaView>
  );
};

export default AddReferenceScreen;