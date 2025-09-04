import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import globalStyles from '../../styles/styles';
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
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Mis Viajes</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.origen} → {item.destino}</Text>
            <Text style={globalStyles.cardText}>Fecha: {item.fecha}</Text>
            <Text style={globalStyles.cardText}>Hora: {item.hora}</Text>
            <Text style={globalStyles.cardText}>Cupos disponibles: {item.cupos_disponibles}</Text>
            {item.descripcion ? (
              <Text style={globalStyles.cardText}>Descripción: {item.descripcion}</Text>
            ) : null}
            {item.vehicleId ? (
              <Text style={globalStyles.cardText}>Vehículo: {item.vehicleId}</Text>
            ) : null}
          </View>
        )}
        ListEmptyComponent={<Text style={globalStyles.normalText}>No tienes viajes registrados.</Text>}
      />
    </View>
  );
}
