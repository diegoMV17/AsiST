import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import styles from '../styles/styles';
import { searchRoutes, joinRoute } from '../api/UserApi';

export default function BuscarRutasScreen({ route }: any) {
  const { userId } = route.params;
  const [rutas, setRutas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    destino: '',
    hora: '',
    conductor: '',
  });

  const fetchRutas = async () => {
    setLoading(true);
    try {
      const data = await searchRoutes(filters);
      setRutas(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error al buscar rutas');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (routeId: string) => {
    try {
      await joinRoute(userId, routeId);
      Alert.alert('Te has unido a la ruta');
      fetchRutas();
    } catch {
      Alert.alert('Error al unirse a la ruta');
    }
  };

  useEffect(() => {
    fetchRutas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Rutas</Text>

      <View style={localStyles.filters}>
        <TextInput
          placeholder="Filtrar por destino"
          value={filters.destino}
          onChangeText={(val) => setFilters({ ...filters, destino: val })}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Filtrar por hora"
          value={filters.hora}
          onChangeText={(val) => setFilters({ ...filters, hora: val })}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Filtrar por conductor"
          value={filters.conductor}
          onChangeText={(val) => setFilters({ ...filters, conductor: val })}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={fetchRutas}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" />
      ) : (
        <FlatList
          data={rutas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={localStyles.item}>
              <Text style={localStyles.text}>{item.origen} → {item.destino}</Text>
              <Text style={localStyles.subtext}>Hora: {item.hora}</Text>
              <Text style={localStyles.subtext}>Conductor: {item.conductorNombre}</Text>
              <TouchableOpacity onPress={() => handleJoin(item.id)}>
                <Text style={localStyles.join}>Unirse</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  filters: {
    marginVertical: 12,
  },
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
  join: {
    color: '#10b981',
    marginTop: 8,
    fontWeight: 'bold',
  },
});
