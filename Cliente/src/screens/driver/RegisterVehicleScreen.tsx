import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../styles/styles';
import { createVehicle } from '../../api/VehicleApi';
import { relateVehicleToUser } from '../../api/UserApi';
import { obtenerToken, obtenerUsuarioDesdeToken } from '../../auth/authService';

export default function RegisterVehicleScreen({ navigation }: any) {
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [soat, setSoat] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState<'carro' | 'SUV' | 'camioneta' | 'sedan'>('carro');
  const [color, setColor] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [error, setError] = useState('');

  const handleRegisterVehicle = async () => {
    if (!placa.trim() || !marca.trim() || !numeroSerie.trim() || !soat.trim() || !modelo.trim() || !color.trim() || !capacidad.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (isNaN(Number(capacidad)) || Number(capacidad) <= 0) {
      setError('La capacidad debe ser un número positivo');
      return;
    }

    try {
      // Crear vehículo sin autenticación
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

      const newVehicle = await createVehicle(placa,
        marca,
        numeroSerie,
        soat,
        modelo,
        tipo,
        color,
        Number(capacidad)); // No envía token
      const vehicleId = newVehicle._id;
      // Relacionar con usuario autenticado
      const token = await obtenerToken();
      const user = await obtenerUsuarioDesdeToken();

      if (!token || !user?.id) {
        setError('No se encontró el token o el usuario');
        return;
      }

      await relateVehicleToUser(user.id, vehicleId, token);

      Alert.alert('Éxito', `Vehículo ${placa} registrado y asociado correctamente`);
      navigation.navigate('VehicleList');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al registrar o asociar el vehículo');
    }
  };

  return (
    <ScrollView >
      <View style={styles.formBox}>
        <Text style={styles.title}>Registro de Vehículo</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          placeholder="Placa"
          value={placa}
          onChangeText={setPlaca}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Marca"
          value={marca}
          onChangeText={setMarca}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Número de Serie"
          value={numeroSerie}
          onChangeText={setNumeroSerie}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="SOAT"
          value={soat}
          onChangeText={setSoat}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Modelo"
          value={modelo}
          onChangeText={setModelo}
          style={styles.input}
          placeholderTextColor="#999"
        />

        {/* Selector de tipo */}
        <View style={styles.roleSelectorContainer}>
          <Text style={styles.roleSelectorLabel}>Tipo de vehículo:</Text>
          <View style={styles.roleSelectorRow}>
            {['carro', 'SUV', 'camioneta', 'sedan'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[
                  styles.roleSelectorButton,
                  tipo === r && styles.roleSelectorButtonActive,
                ]}
                onPress={() => setTipo(r as any)}
              >
                <Text
                  style={[
                    styles.roleSelectorButtonText,
                    tipo === r && styles.roleSelectorButtonTextActive,
                  ]}
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
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Capacidad"
          value={capacidad}
          onChangeText={setCapacidad}
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegisterVehicle}>
          <Text style={styles.buttonText}>Registrar Vehículo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
