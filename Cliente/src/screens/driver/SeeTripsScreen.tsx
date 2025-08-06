import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import styles from '../../styles/styles';
// import { getMyTrips } from '../../api/TripApi'; // Descomenta y ajusta según tu API

type Trip = {
  _id: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  descripcion?: string;
  cupos_disponibles: number;
  vehicleId?: string;
};

export default function SeeTripsScreen() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // const data = await getMyTrips(); // Reemplaza por tu función real
        // setTrips(data);
        // Simulación de datos:
        setTrips([
          {
            _id: '1',
            origen: 'Bogotá',
            destino: 'Medellín',
            fecha: '2025-08-10',
            hora: '08:00',
            descripcion: 'Viaje cómodo y seguro',
            cupos_disponibles: 3,
            vehicleId: 'V123',
          },
          {
            _id: '2',
            origen: 'Cali',
            destino: 'Pereira',
            fecha: '2025-08-12',
            hora: '14:30',
            descripcion: 'Solo equipaje pequeño',
            cupos_disponibles: 2,
            vehicleId: 'V456',
          },
        ]);
      } catch (err) {
        Alert.alert('Error', 'No se pudieron cargar los viajes');
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Viajes</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={localStyles.card}>
            <Text style={localStyles.cardTitle}>{item.origen} → {item.destino}</Text>
            <Text style={localStyles.cardText}>Fecha: {item.fecha}</Text>
            <Text style={localStyles.cardText}>Hora: {item.hora}</Text>
            <Text style={localStyles.cardText}>Cupos disponibles: {item.cupos_disponibles}</Text>
            {item.descripcion ? (
              <Text style={localStyles.cardText}>Descripción: {item.descripcion}</Text>
            ) : null}
            {item.vehicleId ? (
              <Text style={localStyles.cardText}>Vehículo: {item.vehicleId}</Text>
            ) : null}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.normalText}>No tienes viajes registrados.</Text>}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0f172a',
  },
  cardText: {
    fontSize: 15,
    marginBottom: 2,
    color: '#334155',
  },
});