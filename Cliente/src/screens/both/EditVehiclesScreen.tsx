// EditVehicleScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../styles/styles';
import { getVehicleById, updateVehicle } from '../../api/VehicleApi'; // Funciones de API
import { obtenerToken, obtenerUsuarioDesdeToken } from '../../auth/authService';

export default function EditVehicleScreen({ route, navigation }: any) {
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [soat, setSoat] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState<'carro' | 'SUV' | 'camioneta' | 'sedan'>('carro');
  const [color, setColor] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [error, setError] = useState('');
  const { vehicleId } = route.params; // Obtiene el ID del vehículo a editar

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const vehicle = await getVehicleById(vehicleId); // Obtiene los detalles del vehículo desde la API
        setPlaca(vehicle.placa);
        setMarca(vehicle.marca);
        setNumeroSerie(vehicle.numeroSerie);
        setSoat(vehicle.soat);
        setModelo(vehicle.modelo);
        setTipo(vehicle.tipo);
        setColor(vehicle.color);
        setCapacidad(String(vehicle.capacidad));
      } catch (err) {
        setError('Error al cargar el vehículo');
        console.error(err);
      }
    };

    loadVehicle();
  }, [vehicleId]);

  const handleEditVehicle = async () => {
    if (!placa.trim() || !marca.trim() || !numeroSerie.trim() || !soat.trim() || !modelo.trim() || !color.trim() || !capacidad.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (isNaN(Number(capacidad)) || Number(capacidad) <= 0) {
      setError('La capacidad debe ser un número positivo');
      return;
    }

    try {
      const vehicleData = {
        placa,
        marca,
        numeroSerie,
        soat,
        modelo,
        tipo,
        color,
        capacidad: Number(capacidad),
      };

      // Llamar a la API para actualizar el vehículo
      await updateVehicle(vehicleId, vehicleData);
      Alert.alert('Éxito', 'Vehículo actualizado correctamente.');
      navigation.goBack(); // Regresar a la lista de vehículos
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el vehículo');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Editar Vehículo</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          placeholder="Placa"
          value={placa}
          onChangeText={setPlaca}
          style={styles.input}
        />
        <TextInput
          placeholder="Marca"
          value={marca}
          onChangeText={setMarca}
          style={styles.input}
        />
        <TextInput
          placeholder="Número de Serie"
          value={numeroSerie}
          onChangeText={setNumeroSerie}
          style={styles.input}
        />
        <TextInput
          placeholder="SOAT"
          value={soat}
          onChangeText={setSoat}
          style={styles.input}
        />
        <TextInput
          placeholder="Modelo"
          value={modelo}
          onChangeText={setModelo}
          style={styles.input}
        />

        {/* Selector de tipo */}
        <View style={styles.roleSelectorContainer}>
          <Text style={styles.roleSelectorLabel}>Tipo de vehículo:</Text>
          <View style={styles.roleSelectorRow}>
            {['carro', 'SUV', 'camioneta', 'sedan'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleSelectorButton, tipo === r && styles.roleSelectorButtonActive]}
                onPress={() => setTipo(r as any)}
              >
                <Text
                  style={[styles.roleSelectorButtonText, tipo === r && styles.roleSelectorButtonTextActive]}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TextInput
          placeholder="Color"
          value={color}
          onChangeText={setColor}
          style={styles.input}
        />
        <TextInput
          placeholder="Capacidad"
          value={capacidad}
          onChangeText={setCapacidad}
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleEditVehicle}>
          <Text style={styles.buttonText}>Actualizar Vehículo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
