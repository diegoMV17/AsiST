import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminHomeScreen from '../screens/HomeAdminScreen';
import HomeDriverScreen from '../screens/HomeDriverScreen';
import HomePassengerScreen from '../screens/HomePassengerScreen';

import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SupportScreen from '../screens/SupportScreen';
import MyRutesScreen from '../screens/MyRutesScreen';
import CreateRuteScreen from '../screens/CreateRuteScreen';
import SearchRutesScreen from '../screens/SearchRutesScreen';

import ManageUsersScreen from '../screens/ManageUsersScreen';
import ManageRutesScreen from '../screens/ManageRutesScreen';
import ReportScreen from '../screens/ReportScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;

  HomeAdmin: { nombre: string };
  HomeDriver: { nombre: string };
  HomePassenger: { nombre: string };

  Profile: { userId: string };
  History: { userId: string };
  Support: undefined;

  MisRutas: { userId: string };
  CrearRuta: { userId: string };
  BuscarRutas: { userId: string };

  GestionUsuarios: undefined;
  GestionRutas: undefined;
  Reportes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      <Stack.Screen name="HomeAdmin" component={AdminHomeScreen} />
      <Stack.Screen name="HomeDriver" component={HomeDriverScreen} />
      <Stack.Screen name="HomePassenger" component={HomePassengerScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />

      <Stack.Screen name="MisRutas" component={MyRutesScreen} />
      <Stack.Screen name="CrearRuta" component={CreateRuteScreen} />
      <Stack.Screen name="BuscarRutas" component={SearchRutesScreen} />

      <Stack.Screen name="GestionUsuarios" component={ManageUsersScreen} />
      <Stack.Screen name="GestionRutas" component={ManageRutesScreen} />
      <Stack.Screen name="Reportes" component={ReportScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
