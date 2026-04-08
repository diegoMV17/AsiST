import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../../styles/styles';

type TripHistory = {
  _id: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  driverName: string;
  vehicleInfo: string;
  calificacion?: number;
  estado: 'completado' | 'cancelado' | 'pendiente';
};

// 🔥 Datos quemados — rutas reales de Tunja y municipios de Boyacá
const mockHistory: TripHistory[] = [
  {
    _id: 'h1',
    origen: 'Tunja - Terminal',
    destino: 'Duitama - Parque Principal',
    fecha: '2026-02-20',
    hora: '06:30 AM',
    driverName: 'Carlos Méndez',
    vehicleInfo: 'Toyota Corolla · ABC-123',
    calificacion: 5,
    estado: 'completado',

  },
  {
    _id: 'h2',
    origen: 'Tunja - Av. Colón',
    destino: 'Sogamoso - Centro',
    fecha: '2026-02-18',
    hora: '07:00 AM',
    driverName: 'Laura Torres',
    vehicleInfo: 'Mazda 3 · XYZ-789',
    calificacion: 4,
    estado: 'completado',
    
  },
  {
    _id: 'h3',
    origen: 'Tunja - UPTC',
    destino: 'Paipa - Lago Sochagota',
    fecha: '2026-02-14',
    hora: '06:00 AM',
    driverName: 'Andrés Ruiz',
    vehicleInfo: 'Renault Logan · MNO-456',
    estado: 'cancelado',

  },
  {
    _id: 'h4',
    origen: 'Chiquinquirá - Parque',
    destino: 'Tunja - Centro',
    fecha: '2026-02-10',
    hora: '08:00 AM',
    driverName: 'Valentina Gómez',
    vehicleInfo: 'Chevrolet Spark · PQR-321',
    calificacion: 5,
    estado: 'completado',
    
  },
  {
    _id: 'h5',
    origen: 'Tunja - La Glorieta',
    destino: 'Villa de Leyva - Plaza Mayor',
    fecha: '2026-02-06',
    hora: '09:00 AM',
    driverName: 'Miguel Herrera',
    vehicleInfo: 'Kia Picanto · STU-654',
    calificacion: 4,
    estado: 'completado',
    
  },
  {
    _id: 'h6',
    origen: 'Duitama - Terminal',
    destino: 'Sogamoso - Unidad Deportiva',
    fecha: '2026-03-05',
    hora: '07:30 AM',
    driverName: 'Sandra Pineda',
    vehicleInfo: 'Hyundai i10 · VWX-987',
    estado: 'pendiente',

  },
  {
    _id: 'h7',
    origen: 'Tunja - UPTC',
    destino: 'Samacá - Centro',
    fecha: '2026-01-28',
    hora: '06:45 AM',
    driverName: 'Diego Morales',
    vehicleInfo: 'Nissan Versa · YZA-111',
    estado: 'completado',
    calificacion: 5,

  },
];

const estadoConfig = {
  completado: { color: '#16a34a', bg: '#f0fdf4', label: 'COMPLETADO', icon: 'check-circle-outline' },
  cancelado:  { color: '#dc2626', bg: '#fef2f2', label: 'CANCELADO',  icon: 'close-circle-outline' },
  pendiente:  { color: '#ca8a04', bg: '#fefce8', label: 'PENDIENTE',  icon: 'clock-outline' },
};

function StarRow({ rating }: { rating?: number }) {
  if (!rating) return <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Sin calificación aún</Text>;
  return (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Text key={s} style={{ color: s <= rating ? '#f59e0b' : '#d1d5db', fontSize: 14 }}>★</Text>
      ))}
    </View>
  );
}

export default function PassengerTripHistoryScreen() {
  const [trips, setTrips] = useState<TripHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'todos' | 'completado' | 'cancelado' | 'pendiente'>('todos');

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrips(mockHistory);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const filtered = filter === 'todos' ? trips : trips.filter((t) => t.estado === filter);
  const completados = trips.filter((t) => t.estado === 'completado').length;
  const cancelados  = trips.filter((t) => t.estado === 'cancelado').length;

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#00205B" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F7FA' }}>

      {/* ── Resumen ── */}
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Mis Viajes</Text>
        <Text style={styles.summarySubtitle}>Tunja y municipios de Boyacá</Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryStatNumber}>{trips.length}</Text>
            <Text style={styles.summaryStatLabel}>Total</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatNumber, { color: '#4ade80' }]}>{completados}</Text>
            <Text style={styles.summaryStatLabel}>Completados</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatNumber, { color: '#f87171' }]}>{cancelados}</Text>
            <Text style={styles.summaryStatLabel}>Cancelados</Text>
          </View>
        </View>
      </View>

      {/* ── Filtros ── */}
      <View style={styles.filtersRow}>
        {(['todos', 'completado', 'cancelado', 'pendiente'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Lista ── */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        renderItem={({ item }) => {
          const cfg = estadoConfig[item.estado];
          return (
            <View style={[globalStyles.card, { borderLeftWidth: 5, borderLeftColor: cfg.color }]}>

              <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
                <Icon name={cfg.icon as any} size={13} color={cfg.color} />
                <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
              </View>

              <Text style={globalStyles.cardTitle}>{item.origen} → {item.destino}</Text>
              <Text style={globalStyles.cardText}>📅 {item.fecha} · {item.hora}</Text>
              <Text style={globalStyles.cardText}>👤 {item.driverName}</Text>
              <Text style={globalStyles.cardText}>🚗 {item.vehicleInfo}</Text>
            

              <StarRow rating={item.calificacion} />

              {item.estado === 'completado' && !item.calificacion && (
                <TouchableOpacity
                  style={[globalStyles.button, { marginTop: 10, backgroundColor: '#f59e0b' }]}
                  onPress={() => {}}
                >
                  <Text style={globalStyles.buttonText}>⭐ Calificar viaje</Text>
                </TouchableOpacity>
              )}

            </View>
          );
        }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Icon name="map-marker-off-outline" size={48} color="#d1d5db" />
            <Text style={[globalStyles.normalText, { marginTop: 12, color: '#9ca3af' }]}>
              No hay viajes en esta categoría.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summaryHeader: {
    backgroundColor: '#00205B',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  summarySubtitle: {
    color: '#93c5fd',
    fontSize: 13,
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  summaryStat: {
    flex: 1,
    alignItems: 'center',
  },
  summaryStatNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  summaryStatLabel: {
    color: '#93c5fd',
    fontSize: 11,
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 4,
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  filterChipActive: {
    backgroundColor: '#00205B',
  },
  filterText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});