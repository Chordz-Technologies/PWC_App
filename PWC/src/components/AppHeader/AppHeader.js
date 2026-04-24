import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const AppHeader = ({ title, navigation }) => {
  return (
    <>
      <StatusBar backgroundColor="#4361ee" barStyle="light-content" />

      <LinearGradient
        colors={['#4361ee', '#3f37c9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>
      </LinearGradient>
    </>
  );
};

export default AppHeader;