import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/shared/HomeScreen';
import LoginScreen from '../screens/shared/LoginScreen';
import RegisterScreen from '../screens/shared/RegisterScreen';
import AdminTabs from './AdminTabs';
import SplashScreen from '../screens/shared/SplashScreen';
import DriverTabs from './DriverTabs';
import PassengerTabs from './PassengerTabs';
/* import DriverTabs from './DriverTabs';
import PassengerTabs from './PassengerTabs'; */

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;

  AdminTabs: undefined;
  DriverTabs: undefined;
  PassengerTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      {/* Si quiere que cuando recargue permanezca el usuario en sesion, cambiar a : 
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>  */}

      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />

      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="DriverTabs" component={DriverTabs} />
      <Stack.Screen name="PassengerTabs" component={PassengerTabs} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
