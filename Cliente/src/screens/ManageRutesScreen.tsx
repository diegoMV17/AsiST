import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { getAllRutas, cancelRuta } from '../connection/UserServerConnection';

type Ruta = {
  id: string;
  origen: string;
  destino: string;
  estado: string;
};

export default function GestionRutasScreen() {
  const [rutas, setRutas] = useState<Ruta[]>([]);

  const fetchRutas = async () => {
    try {
      const data = await getAllRutas();
      setRutas(data);
    } catch {
      Alert.alert('Error', 'No se pudieron cargar las rutas');
    }
  };

  const handleCancel = async (id: string) => {
    Alert.alert('Cancelar Ruta', '¿Estás seguro?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Sí',
        onPress: async () => {
          await cancelRuta(id);
          fetchRutas();
        }
      }
    ]);
  };

  useEffect(() => {
    fetchRutas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Rutas</Text>
      <FlatList
        data={rutas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.origen} → {item.destino} ({item.estado})</Text>
            <TouchableOpacity onPress={() => handleCancel(item.id)}>
              <Text style={[styles.link, { color: 'red' }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}