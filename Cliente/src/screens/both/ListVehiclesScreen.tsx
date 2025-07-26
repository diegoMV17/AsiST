import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import styles from '../../styles/styles';
import { getUserVehicles, removeVehicleFromUser } from '../../api/UserApi'; // Función para obtener vehículos del usuario
import { deleteVehicle } from '../../api/VehicleApi'; // Funciones para eliminar vehículos
import { obtenerToken, obtenerUsuarioDesdeToken } from '../../auth/authService'; // Funciones para obtener token y usuario

export default function UserVehiclesScreen({ navigation }: any) {
  const [vehicles, setVehicles] = useState<any[]>([]); // Lista de vehículos del usuario
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Para manejar la carga

  // Cargar los vehículos del usuario
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        const token = await obtenerToken();
        const user = await obtenerUsuarioDesdeToken();

        if (!token || !user?.id) {
          setError('Token o usuario no encontrados');
          setLoading(false);
          return;
        }

        const fetchedVehicles = await getUserVehicles(user.id, token);
        setVehicles(fetchedVehicles.vehicles);
      } catch (err) {
        setError('Error al cargar los vehículos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  // Maneja la edición de un vehículo
  const handleEditVehicle = (vehicleId: string) => {
    navigation.navigate('EditarVehiculo', { vehicleId });
  };

  // Eliminar un vehículo de la relación y de la base de datos
  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      const token = await obtenerToken();
      const user = await obtenerUsuarioDesdeToken();

      if (!token || !user?.id) {
        setError('Token o usuario no encontrados');
        return;
      }

      // Eliminar el vehículo de la relación del usuario
      await removeVehicleFromUser(user.id, vehicleId, token);

      // Luego, eliminar el vehículo de la base de datos
      await deleteVehicle(vehicleId);

      // Actualizar la lista de vehículos
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));

      Alert.alert('Éxito', 'Vehículo eliminado correctamente');
    } catch (err) {
      setError('Error al eliminar el vehículo');
      console.error(err);
    }
  };

const confirmDelete = (vehicleId: string) => {
  if (Platform.OS === 'web') {
    const confirm = window.confirm('¿Estás seguro de eliminar este vehículo?');
    if (confirm) handleDeleteVehicle(vehicleId);
  } else {
    Alert.alert('Confirmación', '¿Estás seguro de eliminar este vehículo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => handleDeleteVehicle(vehicleId) },
    ]);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Vehículos</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : (
        <FlatList
          data={vehicles}
          renderItem={({ item }) => (
            <View style={styles.vehicleCard}>
              <Text style={styles.vehicleTitle}>{item.placa} - {item.marca}</Text>
              <Text style={styles.vehicleDetails}>Color: {item.color}</Text>
              <Text style={styles.vehicleDetails}>Modelo: {item.modelo}</Text>
              <Text style={styles.vehicleDetails}>Capacidad: {item.capacidad}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={() => handleEditVehicle(item._id)}
                  style={[styles.button, styles.editButton]}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => confirmDelete(item._id)}
                  style={[styles.button, styles.deleteButton]}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />

      )}

      {/* Botón para ir a la pantalla de registro de vehículo */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegistrarVehiculo')}
      >
        <Text style={styles.buttonText}>Registrar Vehículo</Text>
      </TouchableOpacity>
    </View>
  );
}
