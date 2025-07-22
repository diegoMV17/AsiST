import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeDriverScreen from '../../screens/driver/HomeDriverScreen';
import ProfileScreen from '../../screens/shared/ProfileScreen';
import StackDriver from '../stack/StackDriver';

const Tab = createBottomTabNavigator();

const DriverTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeDriver"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home-outline';

                    if (route.name === 'HomeDriver') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Vehiculos') {
                        iconName = focused ? 'car' : 'car-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="HomeDriver" component={HomeDriverScreen} />
            <Tab.Screen name="Vehiculos" component={StackDriver} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default DriverTabs;
