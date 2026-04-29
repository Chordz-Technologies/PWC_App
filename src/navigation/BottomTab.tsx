import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import OneToOneScreen from '../screens/OneToOneScreen';
import AddReferenceScreen from '../screens/AddReferenceScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#4361ee',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    paddingBottom: insets.bottom + 8,
                    paddingTop: 8,
                    height: 60 + insets.bottom,
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#eee',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = '';

                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'OneToOne') iconName = 'calendar';
                    else if (route.name === 'Reference') iconName = 'book';
                    else if (route.name === 'Events') iconName = 'calendar-clear';
                    else if (route.name === 'Profile') iconName = 'person';

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="OneToOne" component={OneToOneScreen} />
            <Tab.Screen name="Reference" component={AddReferenceScreen} />
            <Tab.Screen name="Events" component={HomeScreen} />
            <Tab.Screen name="Profile" component={HomeScreen} />
        </Tab.Navigator>
    );
};

export default BottomTab;
