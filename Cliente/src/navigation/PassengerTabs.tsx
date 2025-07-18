import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePassengerScreen from '../screens/passenger/HomePassengerScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';

const Tab = createBottomTabNavigator();

const PassengerTabs = () => {
    return (
        <Tab.Navigator initialRouteName="HomePassenger">
            <Tab.Screen name="HomePassenger" component={HomePassengerScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default PassengerTabs;
