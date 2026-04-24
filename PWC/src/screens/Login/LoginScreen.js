import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../../components/InputField/InputField';
import colors from '../../styles/colors';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    if (username === 'admin' && password === '1234') {
      navigation.replace('Home');
    } else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>PUNE WOMEN’S CLUB</Text>

      <InputField
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />

      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot password ?</Text>
      </TouchableOpacity>

     <TouchableOpacity onPress={handleLogin} style={styles.buttonWrapper}>
       <LinearGradient
         colors={[colors.primaryBlue1, colors.primaryBlue2]}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 0 }}
         style={styles.button}
       >
        <Text style={styles.buttonText}>Sign in</Text>
      </LinearGradient>
     </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account ? </Text>
        <TouchableOpacity>
          <Text style={styles.joinText}>Join Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;