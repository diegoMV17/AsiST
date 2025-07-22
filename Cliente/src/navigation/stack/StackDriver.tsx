import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListVehiclesScreen from '../../screens/driver/ListVehiclesScreen';
import RegisterVehicleScreen from '../../screens/driver/RegisterVehicleScreen';
import EditVehicleScreen from '../../screens/driver/EditVehiclesScreen';

const Stack = createNativeStackNavigator();

const StackDriver = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="ListarVehiculos" component={ListVehiclesScreen} options={{ title: 'Mis Vehículos' }} />
      <Stack.Screen name="RegistrarVehiculo" component={RegisterVehicleScreen} options={{ title: 'Registrar Vehículo' }} />
      <Stack.Screen name="EditarVehiculo" component={EditVehicleScreen} options={{ title: 'Editar Vehículo' }} />
    </Stack.Navigator>
  );
};

export default StackDriver;
