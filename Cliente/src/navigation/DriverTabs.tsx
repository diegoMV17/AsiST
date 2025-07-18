import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeDriverScreen from '../screens/driver/HomeDriverScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';
import RegisterVehicleScreen from '../screens/driver/RegisterVehicleScreen';


const Tab = createBottomTabNavigator();

const DriverTabs = () => {
    return (
        <Tab.Navigator initialRouteName="HomeDriver">
            <Tab.Screen name="HomeDriver" component={HomeDriverScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="RelateVehicle" component={RegisterVehicleScreen} />
        </Tab.Navigator>
    );
};

export default DriverTabs;
