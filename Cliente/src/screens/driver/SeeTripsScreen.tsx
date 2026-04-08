import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../../styles/styles';
import { obtenerToken, obtenerUsuarioDesdeToken } from '../../auth/authService';
import { getTripsByDriverId } from '../../api/tripApi';

type Trip = {
  _id: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  descripcion?: string;
  cupos_disponibles: number;
  placa?: string;
  estado: 'activo' | 'finalizado';
};

// 🔥 Viajes quemados con rutas de Tunja y Boyacá
const mockTrips: Trip[] = [
  {
    _id: 'mock1',
    origen: 'Tunja - UPTC',
    destino: 'Duitama - Terminal',
    fecha: '2026-03-12',
    hora: '06:30 AM',
    cupos_disponibles: 2,
    placa: 'TUN-001',
    estado: 'activo',
    descripcion: 'Salida puntual desde la portería principal de la UPTC',
  },
  {
    _id: 'mock2',
    origen: 'Tunja - Terminal',
    destino: 'Sogamoso - Centro',
    fecha: '2026-03-14',
    hora: '07:00 AM',
    cupos_disponibles: 3,
    placa: 'TUN-002',
    estado: 'activo',
  },
  {
    _id: 'mock3',
    origen: 'Tunja - La Glorieta',
    destino: 'Paipa - Lago Sochagota',
    fecha: '2026-03-16',
    hora: '08:00 AM',
    cupos_disponibles: 1,
    placa: 'TUN-003',
    estado: 'activo',
  },
  {
    _id: 'mock4',
    origen: 'Tunja - Av. Colón',
    destino: 'Villa de Leyva - Plaza Mayor',
    fecha: '2026-02-20',
    hora: '09:00 AM',
    cupos_disponibles: 0,
    placa: 'TUN-004',
    estado: 'finalizado',
  },
  {
    _id: 'mock5',
    origen: 'Tunja - Centro',
    destino: 'Chiquinquirá - Parque Principal',
    fecha: '2026-02-14',
    hora: '06:00 AM',
    cupos_disponibles: 0,
    placa: 'TUN-005',
    estado: 'finalizado',
    descripcion: 'Viaje sin paradas intermedias',
  },
  {
    _id: 'mock6',
    origen: 'Tunja - UPTC',
    destino: 'Samacá - Centro',
    fecha: '2026-02-08',
    hora: '07:30 AM',
    cupos_disponibles: 0,
    placa: 'TUN-006',
    estado: 'finalizado',
  },
];

export default function SeeTripsScreen() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setLoading(true);
        const token = await obtenerToken();
        const user = await obtenerUsuarioDesdeToken();

        if (!token || !user?.id) {
          setTrips(mockTrips);
          return;
        }

        const fetchedTrips = await getTripsByDriverId(user.id);
        const realTrips: Trip[] = fetchedTrips.map((trip: any) => ({
          ...trip,
          estado: trip.estado ?? (Math.random() > 0.5 ? 'activo' : 'finalizado'),
        }));

        setTrips([...realTrips, ...mockTrips]);
      } catch (err) {
        // Si falla la API igual mostramos los quemados
        setTrips(mockTrips);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, []);

  const activeTrips   = trips.filter((t) => t.estado === 'activo');
  const finishedTrips = trips.filter((t) => t.estado === 'finalizado');

  const renderTrip = (item: Trip) => {
    const isActive = item.estado === 'activo';
    return (
      <View
        style={[
          styles.card,
          { borderLeftColor: isActive ? '#16a34a' : '#6b7280' },
        ]}
      >
        {/* Badge */}
        <View style={[styles.badge, { backgroundColor: isActive ? '#f0fdf4' : '#f3f4f6' }]}>
          <Icon
            name={isActive ? 'circle' : 'check-circle-outline'}
            size={10}
            color={isActive ? '#16a34a' : '#6b7280'}
          />
          <Text style={[styles.badgeText, { color: isActive ? '#16a34a' : '#6b7280' }]}>
            {isActive ? 'ACTIVO' : 'FINALIZADO'}
          </Text>
        </View>

        <Text style={styles.cardTitle}>{item.origen} → {item.destino}</Text>
        <Text style={styles.cardText}>📅 {item.fecha} · {item.hora}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoPill}>
            <Icon name="account-group-outline" size={14} color="#475569" />
            <Text style={styles.infoPillText}>
              {item.cupos_disponibles} cupo{item.cupos_disponibles !== 1 ? 's' : ''}
            </Text>
          </View>
          {item.placa && (
            <View style={styles.infoPill}>
              <Icon name="car-outline" size={14} color="#475569" />
              <Text style={styles.infoPillText}>{item.placa}</Text>
            </View>
          )}
        </View>

        {item.descripcion && (
          <Text style={styles.descText}>📝 {item.descripcion}</Text>
        )}

        {/* Botones */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#1d4ed8' }]}
            onPress={() => {}}
          >
            <Icon name="eye-outline" size={15} color="#fff" />
            <Text style={styles.btnText}>Ver detalles</Text>
          </TouchableOpacity>

          {isActive && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#16a34a' }]}
              onPress={() => {}}
            >
              <Icon name="flag-checkered" size={15} color="#fff" />
              <Text style={styles.btnText}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#00205B" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F7FA' }}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Viajes</Text>
        <Text style={styles.headerSubtitle}>Tunja y municipios de Boyacá</Text>
        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatNumber}>{trips.length}</Text>
            <Text style={styles.headerStatLabel}>Total</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStat}>
            <Text style={[styles.headerStatNumber, { color: '#4ade80' }]}>{activeTrips.length}</Text>
            <Text style={styles.headerStatLabel}>Activos</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStat}>
            <Text style={[styles.headerStatNumber, { color: '#94a3b8' }]}>{finishedTrips.length}</Text>
            <Text style={styles.headerStatLabel}>Finalizados</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>

        {/* ── Activos ── */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionDot} />
          <Text style={[styles.sectionTitle, { color: '#16a34a' }]}>Viajes Activos</Text>
          <Text style={styles.sectionCount}>{activeTrips.length}</Text>
        </View>

        {activeTrips.length === 0 ? (
          <View style={styles.emptyBox}>
            <Icon name="map-marker-off-outline" size={32} color="#d1d5db" />
            <Text style={styles.emptyText}>No tienes viajes activos.</Text>
          </View>
        ) : (
          activeTrips.map((item) => (
            <View key={item._id}>{renderTrip(item)}</View>
          ))
        )}

        {/* ── Finalizados ── */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <View style={[styles.sectionDot, { backgroundColor: '#6b7280' }]} />
          <Text style={[styles.sectionTitle, { color: '#6b7280' }]}>Viajes Finalizados</Text>
          <Text style={styles.sectionCount}>{finishedTrips.length}</Text>
        </View>

        {finishedTrips.length === 0 ? (
          <View style={styles.emptyBox}>
            <Icon name="history" size={32} color="#d1d5db" />
            <Text style={styles.emptyText}>No tienes viajes finalizados.</Text>
          </View>
        ) : (
          finishedTrips.map((item) => (
            <View key={item._id}>{renderTrip(item)}</View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00205B',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: '#93c5fd',
    fontSize: 13,
    marginBottom: 16,
  },
  headerStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  headerStat: {
    flex: 1,
    alignItems: 'center',
  },
  headerStatNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerStatLabel: {
    color: '#93c5fd',
    fontSize: 11,
    marginTop: 2,
  },
  headerStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#16a34a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  sectionCount: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '600',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  infoPillText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  descText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 8,
  },
});