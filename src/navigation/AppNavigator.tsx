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
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AllMeetingsScreen from '../screens/AllMeetingsScreen';
import ClientsScreen from '../screens/ClientsScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';
import MemberProfileDetailsScreen from '../screens/MemberProfileDetailsScreen';
import ChapterMembersScreen from '../screens/ChapterMembersScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MembershipRequiredScreen from '../screens/MembershipRequiredScreen';
import SuggestionScreen from '../screens/SuggestionScreen';
import CertificateScreen from '../screens/CertificateScreen';
import PWCCellsScreen from '../screens/PwcCellsScreen';
import AddVisitorScreen from '../screens/AddVisitorScreen';

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
    Analytics: undefined;
    AllMeetings: undefined;
    Clients: undefined;
    BusinessProfile: undefined;
    MemberProfileDetails: undefined;
    ChapterMembers: undefined;
    Notifications: undefined;
    MembershipRequired: undefined;
    Suggestion: undefined;
    Certificate: undefined;
    PWCCells: undefined;
    AddVisitor: undefined;
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
                <Stack.Screen name="Analytics" component={AnalyticsScreen} />
                <Stack.Screen name="AllMeetings" component={AllMeetingsScreen} />
                <Stack.Screen name="Clients" component={ClientsScreen} />
                <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
                <Stack.Screen name="MemberProfileDetails" component={MemberProfileDetailsScreen} />
                <Stack.Screen name="ChapterMembers" component={ChapterMembersScreen} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} />
                <Stack.Screen name="MembershipRequired" component={MembershipRequiredScreen} />
                <Stack.Screen name="Suggestion" component={SuggestionScreen} />
                <Stack.Screen name="Certificate" component={CertificateScreen} />
                <Stack.Screen name="PWCCells" component={PWCCellsScreen} />
                <Stack.Screen name="AddVisitor" component={AddVisitorScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;