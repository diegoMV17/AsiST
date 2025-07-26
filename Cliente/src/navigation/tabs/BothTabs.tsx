import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeBothScreen from '../../screens/both/HomeBothScreen';
import ProfileScreen from '../../screens/shared/ProfileScreen';
import StackBoth from '../stack/StackBoth';

const Tab = createBottomTabNavigator();

const BothTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeBoth"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home-outline';

                    if (route.name === 'HomeBoth') {
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
            <Tab.Screen name="HomeBoth" component={HomeBothScreen} />
            <Tab.Screen name="Vehiculos" component={StackBoth} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BothTabs;
