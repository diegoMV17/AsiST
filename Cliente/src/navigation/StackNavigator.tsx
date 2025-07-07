// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminHomeScreen from '../screens/HomeAdminScreen';
import HomeDriverScreen from '../screens/HomeDriverScreen';
import HomePassengerScreen from '../screens/HomePassengerScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  HomeAdmin: undefined;
  HomeDriver: undefined;
  HomePassenger: undefined;
  Register: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="HomeAdmin" component={AdminHomeScreen} />
      <Stack.Screen name="HomeDriver" component={HomeDriverScreen} />
      <Stack.Screen name="HomePassenger" component={HomePassengerScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
