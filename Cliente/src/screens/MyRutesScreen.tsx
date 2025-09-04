import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import globalStyles from '../styles/styles';
import { getUserRoutes, deleteRoute } from '../api/UserApi';

export default function MisRutasScreen({ route, navigation }: any) {
  const { userId } = route.params;
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      const data = await getUserRoutes(userId);
      setRoutes(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error al cargar las rutas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (routeId: string) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar esta ruta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRoute(routeId);
              fetchRoutes(); // refresca
            } catch (error) {
              Alert.alert('Error al eliminar la ruta');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4f46e5" />;
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Mis Rutas</Text>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={localStyles.item}>
            <Text style={localStyles.text}>{item.origen} → {item.destino}</Text>
            <Text style={localStyles.subtext}>Pasajeros: {item.pasajerosCount}</Text>
            <View style={localStyles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('EditarRuta', { ruta: item })}>
                <Text style={localStyles.edit}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={localStyles.delete}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('CrearRuta', { userId })}
      >
        <Text style={globalStyles.buttonText}>Crear Nueva Ruta</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  item: {
    backgroundColor: '#1e293b',
    marginVertical: 6,
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: '#f1f5f9',
    fontSize: 16,
  },
  subtext: {
    color: '#94a3b8',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  edit: { color: '#3b82f6' },
  delete: { color: '#ef4444' },
});
