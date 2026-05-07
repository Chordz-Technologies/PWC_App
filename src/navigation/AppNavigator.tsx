import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTab from './BottomTab';
import OneToOneScreen from '../screens/OneToOneScreen';
import AddReferralScreen from '../screens/AddReferralScreen';
import EventScreen from '../screens/EventScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EventRegisterScreen from '../screens/EventRegisterScreen';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    OneToOne: undefined;
    AddReferral: undefined;
    Events: undefined;
    Profile: undefined;
    EditProfile: undefined;
    EventRegister: undefined;
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
                <Stack.Screen name="AddReferral" component={AddReferralScreen} />
                <Stack.Screen name="Events" component={EventScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="EventRegister" component={EventRegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;