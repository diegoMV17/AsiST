import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles/styles';
import { getAvailableTrips } from '../../api/tripApi';

type Trip = {
  _id: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  descripcion?: string;
  cupos_disponibles: number;
  driverName?: string;
  vehicleInfo?: string;
};

export default function TripAviableScreen() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setLoading(true);
        const fetchedTrips = await getAvailableTrips();
        setTrips(fetchedTrips); 
      } catch (err) {
        Alert.alert('Error', 'No se pudieron cargar los viajes disponibles');
      } finally {
        setLoading(false);
      }
    };
    loadTrips();
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
      <Text style={globalStyles.title}>Viajes Disponibles</Text>
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
            {item.driverName ? (
              <Text style={globalStyles.cardText}>Conductor: {item.driverName}</Text>
            ) : null}
            {item.vehicleInfo ? (
              <Text style={globalStyles.cardText}>Vehículo: {item.vehicleInfo}</Text>
            ) : null}
            <TouchableOpacity style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>Postularme</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={globalStyles.normalText}>No hay viajes disponibles en este momento.</Text>}
      />
    </View>
  );
}