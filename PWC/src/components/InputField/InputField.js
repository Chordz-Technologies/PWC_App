import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

const InputField = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

export default InputField;