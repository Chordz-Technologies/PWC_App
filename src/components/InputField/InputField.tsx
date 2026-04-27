import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';

type Props = TextInputProps;

const InputField = (props: Props) => {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholderTextColor="#777"
      {...props}
    />
  );
};

export default InputField;