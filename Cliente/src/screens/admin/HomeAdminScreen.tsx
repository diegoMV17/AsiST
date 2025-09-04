import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from '../../styles/styles';

type HomeAdminScreenProps = {
  route: { params?: { nombre?: string } };
  navigation: { navigate: (screen: string) => void };
};

const HomeAdminScreen: React.FC<HomeAdminScreenProps> = ({ route, navigation }) => {
  const nombre = route?.params?.nombre || 'Administrador';

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={globalStyles.formBox}>
        <Text style={globalStyles.title}>Panel de Administración</Text>
        <Text style={globalStyles.normalText}>
          ¡Bienvenido, {nombre}! Has ingresado correctamente como administrador.
        </Text>

        <View >
          <Text >Gestión de rutas</Text>

          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate('VerRutas')}
            accessibilityLabel="Ver rutas"
          >
            <Text style={globalStyles.buttonText}>Ver rutas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate('EditarRuta')}
            accessibilityLabel="Editar rutas"
          >
            <Text style={globalStyles.buttonText}>Editar rutas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate('EliminarRuta')}
            accessibilityLabel="Eliminar rutas"
          >
            <Text style={globalStyles.buttonText}>Eliminar rutas</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
  );
};

export default HomeAdminScreen;