import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import RegistrationSuccessScreen from '../screens/Event/SuccessScreen';
// import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import EventsScreen from '../screens/Event/EventsScreen';
import EventRegisterScreen from '../screens/Event/EventRegister';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ReferenceScreen from '../screens/Reference/ReferenceScreen';
import ScheduleScreen from '../screens/Schedule/ScheduleScreen';
import NewMeetingScreen from '../screens/Schedule/NewMeetingScreen';
import AddReferenceScreen from '../screens/AddRef/AddReferenceScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SpalshScreen" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="EventRegister" component={EventRegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Reference" component={ReferenceScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="NewMeetingScreen"component={NewMeetingScreen}/>
        <Stack.Screen name="AddRef" component={AddReferenceScreen} />
        <Stack.Screen name="RegistrationSuccess"component={RegistrationSuccessScreen}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;