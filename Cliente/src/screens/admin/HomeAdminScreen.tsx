import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/styles';

type HomeAdminScreenProps = {
  route: { params?: { nombre?: string } };
  navigation: { navigate: (screen: string) => void };
};

const HomeAdminScreen: React.FC<HomeAdminScreenProps> = ({ route, navigation }) => {
  const nombre = route?.params?.nombre || 'Administrador';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Panel de Administración</Text>
        <Text style={styles.normalText}>
          ¡Bienvenido, {nombre}! Has ingresado correctamente como administrador.
        </Text>

        <View >
          <Text >Gestión de rutas</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('VerRutas')}
            accessibilityLabel="Ver rutas"
          >
            <Text style={styles.buttonText}>Ver rutas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditarRuta')}
            accessibilityLabel="Editar rutas"
          >
            <Text style={styles.buttonText}>Editar rutas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EliminarRuta')}
            accessibilityLabel="Eliminar rutas"
          >
            <Text style={styles.buttonText}>Eliminar rutas</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
  );
};

export default HomeAdminScreen;