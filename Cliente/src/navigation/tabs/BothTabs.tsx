import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeBothScreen from "../../screens/both/HomeBothScreen";
import ProfileScreen from "../../screens/shared/ProfileScreen";
import CreatretripsScreen from '../../screens/driver/CreatretripsScreen';
import SeeTripsScreen from '../../screens/driver/SeeTripsScreen';
import TripAviableScreen from "../../screens/passenger/TripAviableScreen";
import DriverTabs from "./DriverTabs";


const Tab = createBottomTabNavigator();

const BothTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeBoth"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home-outline";

          if (route.name === "HomeBoth") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Vehiculos") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Ver mis Viajes") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (route.name === "Crear mis Viajes") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (route.name === 'Viajes Disponibles') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    } 

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="HomeBoth" component={HomeBothScreen} />
      <Tab.Screen name="Vehiculos" component={DriverTabs} />
      <Tab.Screen name="Crear mis Viajes" component={CreatretripsScreen} />
      <Tab.Screen name="Ver mis Viajes" component={SeeTripsScreen} />
      <Tab.Screen name="Viajes Disponibles" component={TripAviableScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BothTabs;
