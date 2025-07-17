import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { createRoute } from '../connection/UserServerConnection';

export default function CrearRutaScreen({ route, navigation }: any) {
  const { userId } = route.params;
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [hora, setHora] = useState('');
  const [cupos, setCupos] = useState('');

  const handleCreate = async () => {
    if (!origen || !destino || !hora || !cupos) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }
    try {
      await createRoute(userId, origen, destino, hora, parseInt(cupos));
      Alert.alert('Ruta creada correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error al crear la ruta');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Crear Ruta</Text>
        <TextInput
          placeholder="Origen"
          value={origen}
          onChangeText={setOrigen}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Destino"
          value={destino}
          onChangeText={setDestino}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Hora"
          value={hora}
          onChangeText={setHora}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Cupos disponibles"
          value={cupos}
          onChangeText={setCupos}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Crear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
