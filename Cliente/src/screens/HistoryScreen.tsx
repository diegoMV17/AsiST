import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import { getUserHistory } from '../connection/UserServerConnection';

export default function HistoryScreen({ route }: any) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = route.params; // recibe el id del usuario

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getUserHistory(userId);
        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4f46e5" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Viajes</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={localStyles.item}>
            <Text style={localStyles.text}>{item.fecha} - {item.origen} → {item.destino}</Text>
            <Text style={localStyles.estado}>{item.estado}</Text>
          </View>
        )}
      />
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
  estado: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
});
