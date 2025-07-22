import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeAdminScreen from '../../screens/admin/HomeAdminScreen';
import ProfileScreen from '../../screens/shared/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const AdminTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeAdmin"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home-outline';

                    if (route.name === 'HomeAdmin') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="HomeAdmin" component={HomeAdminScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default AdminTabs;
