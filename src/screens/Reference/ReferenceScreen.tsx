import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../components/AppHeader/AppHeader';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import commonStyles from '../../styles/commonstyles';
import styles from './styles';

const ReferenceScreen = ({ navigation }: any) => {
  return (
    <View style={commonStyles.safeArea}>
      <AppHeader title="Reference" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRef')}
        >
          <Ionicons name="add-circle-outline" size={26} color="#fff" />
          <Text style={styles.addButtonText}>Add Reference</Text>
        </TouchableOpacity>

        <Text style={styles.title}>My References</Text>

        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={34} color="#4A63F0" />
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>Priya Sharma</Text>
              <Text style={styles.role}>Business Owner</Text>
              <Text style={styles.note}>
                Recommended for software services
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomTabBar activeTab="Reference" navigation={navigation} />
    </View>
  );
};

export default ReferenceScreen;