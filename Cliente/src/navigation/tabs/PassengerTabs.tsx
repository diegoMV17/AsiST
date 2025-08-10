import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePassengerScreen from '../../screens/passenger/HomePassengerScreen';
import ProfileScreen from '../../screens/shared/ProfileScreen';
import TripAviableScreen from '../../screens/passenger/TripAviableScreen';
import CreatretripsScreen from '../../screens/driver/CreatretripsScreen';
import SeeTripsScreen from '../../screens/driver/SeeTripsScreen';


const Tab = createBottomTabNavigator();

const PassengerTabs = () => {
    return (
        <Tab.Navigator initialRouteName="HomePassenger"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home-outline';
                    if (route.name === 'HomePassenger') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Viajes Disponibles') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    } else if (route.name === 'Ver mis Viajes') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    } else if (route.name === 'Crear mis Viajes') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="HomePassenger" component={HomePassengerScreen} />
            <Tab.Screen name="Viajes Disponibles" component={TripAviableScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default PassengerTabs;
