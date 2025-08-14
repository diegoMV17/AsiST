import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator,Alert, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { getAvailableTrips } from "../../api/tripApi";

export default function TripAvailableScreen() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = Constants.expoConfig?.extra?.PUBLIC_URL_API;

  useEffect(() => {
    const loadTrips  = async () => {

      try {
       setLoading(true);
        const fetchedTrips = await getAvailableTrips();
        setTrips(fetchedTrips); 
      }  catch (err) {
        Alert.alert('Error', 'No se pudieron cargar los viajes disponibles');
      } finally {
        setLoading(false);
      }
    };

    loadTrips ();
  }, []);

  const demoTrips = [
    {
      id: "demo1",
      origen: "Bogotá",
      destino: "Medellín",
      fecha: "2025-08-20",
      hora: "08:00",
      cupos_disponibles: 3,
      precio: 50000,
    },
    {
      id: "demo2",
      origen: "Cali",
      destino: "Cartagena",
      fecha: "2025-08-21",
      hora: "07:30",
      cupos_disponibles: 2,
      precio: 80000,
    },
  ];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando viajes...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.tripCard}>
          <Text style={styles.title}>{item.origen} ➡ {item.destino}</Text>
          <Text>{item.fecha} - {item.hora}</Text>
          <Text>Cupos: {item.cupos_disponibles}</Text>
          <Text>Precio: ${item.precio}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Postularme</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  tripCard: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  button: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
