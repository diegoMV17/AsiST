import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeAdminScreen from '../screens/admin/HomeAdminScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';


const Tab = createBottomTabNavigator();

const AdminTabs = () => {
    return (
        <Tab.Navigator initialRouteName="HomeAdmin">
            <Tab.Screen name="HomeAdmin" component={HomeAdminScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default AdminTabs;
