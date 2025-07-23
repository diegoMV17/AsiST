import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListVehiclesScreen from '../../screens/both/ListVehiclesScreen';
import RegisterVehicleScreen from '../../screens/both/RegisterVehicleScreen';
import EditVehicleScreen from '../../screens/both/EditVehiclesScreen';
import HomeBothScreen from '../../screens/both/HomeBothScreen';

const Stack = createNativeStackNavigator();

const StackBoth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="HomeBoth" component={HomeBothScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="ListarVehiculos" component={ListVehiclesScreen} options={{ title: 'Mis Vehículos' }} />
      <Stack.Screen name="RegistrarVehiculo" component={RegisterVehicleScreen} options={{ title: 'Registrar Vehículo' }} />
      <Stack.Screen name="EditarVehiculo" component={EditVehicleScreen} options={{ title: 'Editar Vehículo' }} />
      
    </Stack.Navigator>
  );
};

export default StackBoth;
