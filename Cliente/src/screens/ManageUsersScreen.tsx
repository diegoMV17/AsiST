import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { getAllUsers, deleteUser, changeUserRole } from '../connection/UserServerConnection';

type User = {
  id: string;
  nombre: string;
  rol: string;
};

export default function GestionUsuariosScreen() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Eliminar', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        onPress: async () => {
          await deleteUser(id);
          fetchUsers();
        }
      }
    ]);
  };

  const handleChangeRole = async (id: string, newRole: string) => {
    await changeUserRole(id, newRole);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre} - {item.rol}</Text>
            <View >
              <TouchableOpacity onPress={() => handleChangeRole(item.id, 'conductor')}>
                <Text style={styles.link}>Conductor</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeRole(item.id, 'pasajero')}>
                <Text style={styles.link}>Pasajero</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={[styles.link, { color: 'red' }]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}