import React from 'react';
import { Text, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type Props = {
  title: string;
  onBack?: () => void;
};

const AppHeader = ({ title, onBack }: Props) => {
  return (
    <>
      <StatusBar backgroundColor="#4361ee" barStyle="light-content" />

      <LinearGradient
        colors={['#4361ee', '#3f37c9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>
      </LinearGradient>
    </>
  );
};

export default AppHeader;