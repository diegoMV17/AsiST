import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { obtenerUsuarioDesdeToken, obtenerToken } from '../../auth/authService';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await obtenerToken();
      const user = await obtenerUsuarioDesdeToken();

      if (token && user) {
        // Redirige según el rol
        switch (user.rol) {
          case 'admin':
            navigation.replace('AdminTabs');
            break;
          case 'conductor':
            navigation.replace('DriverTabs');
            break;
          case 'pasajero':
            navigation.replace('PassengerTabs');
            break;
          case 'ambos':
            navigation.replace('PassengerTabs'); // o alguna lógica combinada
            break;
          default:
            navigation.replace('Login');
        }
      } else {
        navigation.replace('Login');
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Cargando...</Text>
    </View>
  );
}
