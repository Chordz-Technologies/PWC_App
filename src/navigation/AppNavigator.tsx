import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTab from './BottomTab';
import OneToOneScreen from '../screens/OneToOneScreen';
import AddReferenceScreen from '../screens/AddReferenceScreen';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    OneToOne: undefined;
    AddReference: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={BottomTab} />
                <Stack.Screen name="OneToOne" component={OneToOneScreen} />
                <Stack.Screen name="AddReference" component={AddReferenceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;