import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import styles from '../../styles/styles';
import { obtenerToken, obtenerUsuarioDesdeToken } from '../../auth/authService';
import { getTripsByDriverId } from '../../api/tripApi';
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
  const [error, setError] = useState('');

   useEffect(() => {
      const loadVehicles = async () => {
        try {
          setLoading(true);
          const token = await obtenerToken();
          const user = await obtenerUsuarioDesdeToken();
          
          if (!token || !user?.id) {
            setError('Token o usuario no encontrados');
            return;
          }
  
          const fetchedTrips = await getTripsByDriverId(user.id);
           console.log('Viajes obtenidos:', fetchedTrips);
          setTrips(fetchedTrips);
        } catch (err) {
          setError('Error al cargar los vehículos');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      loadVehicles();
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
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.origen} → {item.destino}</Text>
            <Text style={styles.cardText}>Fecha: {item.fecha}</Text>
            <Text style={styles.cardText}>Hora: {item.hora}</Text>
            <Text style={styles.cardText}>Cupos disponibles: {item.cupos_disponibles}</Text>
            {item.descripcion ? (
              <Text style={styles.cardText}>Descripción: {item.descripcion}</Text>
            ) : null}
            {item.vehicleId ? (
              <Text style={styles.cardText}>Vehículo: {item.vehicleId}</Text>
            ) : null}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.normalText}>No tienes viajes registrados.</Text>}
      />
    </View>
  );
}
