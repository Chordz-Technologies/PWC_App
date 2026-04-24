import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ScheduleScreen from '../screens/Schedule/ScheduleScreen';
import ReferenceScreen from '../screens/Reference/ReferenceScreen';
import EventsScreen from '../screens/Events/EventsScreen';
import EventRegisterScreen from '../screens/Events/EventRegisterScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AddRefernceScreen from '../screens/AddRef/AddRefernceScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Reference" component={ReferenceScreen} />
      <Stack.Screen name="AddReference" component={AddRefernceScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="EventRegister" component={EventRegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;