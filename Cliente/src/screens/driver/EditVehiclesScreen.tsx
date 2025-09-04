// EditVehicleScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import globalStyles from '../../styles/styles';
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
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Editar Vehículo</Text>

        {error && <Text style={globalStyles.errorText}>{error}</Text>}

        <TextInput
          placeholder="Placa"
          value={placa}
          onChangeText={setPlaca}
          style={globalStyles.input}
        />
        <TextInput
          placeholder="Marca"
          value={marca}
          onChangeText={setMarca}
          style={globalStyles.input}
        />
        <TextInput
          placeholder="Número de Serie"
          value={numeroSerie}
          onChangeText={setNumeroSerie}
          style={globalStyles.input}
        />
        <TextInput
          placeholder="SOAT"
          value={soat}
          onChangeText={setSoat}
          style={globalStyles.input}
        />
        <TextInput
          placeholder="Modelo"
          value={modelo}
          onChangeText={setModelo}
          style={globalStyles.input}
        />

        {/* Selector de tipo */}
        <View style={globalStyles.roleSelectorContainer}>
          <Text style={globalStyles.roleSelectorLabel}>Tipo de vehículo:</Text>
          <View style={globalStyles.roleSelectorRow}>
            {['carro', 'SUV', 'camioneta', 'sedan'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[globalStyles.roleSelectorButton, tipo === r && globalStyles.roleSelectorButtonActive]}
                onPress={() => setTipo(r as any)}
              >
                <Text
                  style={[globalStyles.roleSelectorButtonText, tipo === r && globalStyles.roleSelectorButtonTextActive]}
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
          style={globalStyles.input}
        />
        <TextInput
          placeholder="Capacidad"
          value={capacidad}
          onChangeText={setCapacidad}
          style={globalStyles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity style={globalStyles.button} onPress={handleEditVehicle}>
          <Text style={globalStyles.buttonText}>Actualizar Vehículo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={globalStyles.link}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
