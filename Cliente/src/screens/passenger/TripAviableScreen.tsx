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

// 🔥 Viajes quemados para demo
const mockTrips: Trip[] = [
  {
    _id: 'mock1',
    origen: 'Tunja - La Fuente',
    destino: 'Universidad Santo Tomás',
    fecha: '2026-03-12',
    hora: '06:30 AM',
    descripcion: 'Salida desde la fuente, viaje directo sin paradas',
    cupos_disponibles: 3,
    driverName: 'Carlos Méndez',
    vehicleInfo: 'Toyota Corolla - ABC123',
  },
  {
    _id: 'mock2',
    origen: 'Los Hongos - Tunja',
    destino: 'Universidad Santo Tomás',
    fecha: '2026-03-12',
    hora: '07:00 AM',
    descripcion: 'Viaje directo, sin paradas intermedias',
    cupos_disponibles: 1,
    driverName: 'Laura Torres',
    vehicleInfo: 'Mazda 3 - XYZ789',
  },
  {
    _id: 'mock3',
    origen: 'Universidad Santo Tomás',
    destino: 'Muiscas - Tunja',
    fecha: '2026-03-13',
    hora: '06:00 AM',
    cupos_disponibles: 4,
    driverName: 'Andrés Ruiz',
    vehicleInfo: 'Renault Logan - MNO456',
  },
];

export default function TripAviableScreen() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setLoading(true);
        const fetchedTrips = await getAvailableTrips();
        // 🔥 Combinar viajes reales con quemados
        setTrips([...fetchedTrips, ...mockTrips]);
      } catch (err) {
        // Si falla la API, al menos mostramos los quemados
        Alert.alert('Error', 'No se pudieron cargar los viajes en línea. Mostrando viajes de ejemplo.');
        setTrips(mockTrips);
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
            {/* Badge de cupos */}
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: item.cupos_disponibles > 0 ? '#16a34a' : '#ef4444',
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 4,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                {item.cupos_disponibles > 0
                  ? `${item.cupos_disponibles} cupo${item.cupos_disponibles > 1 ? 's' : ''} disponible${item.cupos_disponibles > 1 ? 's' : ''}`
                  : 'Sin cupos'}
              </Text>
            </View>

            <Text style={globalStyles.cardTitle}>{item.origen} → {item.destino}</Text>
            <Text style={globalStyles.cardText}>📅 Fecha: {item.fecha}</Text>
            <Text style={globalStyles.cardText}>🕐 Hora: {item.hora}</Text>

            {item.descripcion ? (
              <Text style={globalStyles.cardText}>📝 {item.descripcion}</Text>
            ) : null}
            {item.driverName ? (
              <Text style={globalStyles.cardText}>👤 Conductor: {item.driverName}</Text>
            ) : null}
            {item.vehicleInfo ? (
              <Text style={globalStyles.cardText}>🚗 Vehículo: {item.vehicleInfo}</Text>
            ) : null}

            <TouchableOpacity
              style={[
                globalStyles.button,
                { marginTop: 12, backgroundColor: item.cupos_disponibles > 0 ? '#00205B' : '#94a3b8' },
              ]}
              disabled={item.cupos_disponibles === 0}
              onPress={() => {}}
            >
              <Text style={globalStyles.buttonText}>
                {item.cupos_disponibles > 0 ? 'Postularme' : 'Sin cupos'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={globalStyles.normalText}>No hay viajes disponibles en este momento.</Text>
        }
      />
    </View>
  );
}