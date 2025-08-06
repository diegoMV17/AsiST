import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../../styles/styles';


export default function CreatretripsScreen() {
  const [driverId, setDriverId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cupos_disponibles, setCuposDisponibles] = useState('');

  const handleSubmit = async () => {
    if (!driverId || !vehicleId || !origen || !destino || !fecha || !hora || !cupos_disponibles) {
      Alert.alert('Error', 'Completa todos los campos obligatorios');
      return;
    }
    const tripData = {
      driverId,
      vehicleId,
      origen,
      destino,
      fecha,
      hora,
      descripcion,
      cupos_disponibles: Number(cupos_disponibles),
    };
    // try {
    //   await createTrip(tripData);
    //   Alert.alert('Éxito', 'Viaje creado correctamente');
    // } catch (err) {
    //   Alert.alert('Error', 'No se pudo crear el viaje');
    // }
    Alert.alert('Simulación', 'Viaje creado correctamente');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Viaje</Text>

      <TextInput
        style={styles.input}
        placeholder="ID del conductor"
        value={driverId}
        onChangeText={setDriverId}
      />
      <TextInput
        style={styles.input}
        placeholder="ID del vehículo"
        value={vehicleId}
        onChangeText={setVehicleId}
      />
      <TextInput
        style={styles.input}
        placeholder="Origen"
        value={origen}
        onChangeText={setOrigen}
      />
      <TextInput
        style={styles.input}
        placeholder="Destino"
        value={destino}
        onChangeText={setDestino}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Cupos disponibles"
        value={cupos_disponibles}
        onChangeText={setCuposDisponibles}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Viaje</Text>
      </TouchableOpacity>
    </View>
  );
}