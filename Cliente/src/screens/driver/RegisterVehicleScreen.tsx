import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import globalStyles from '../../styles/styles';
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
      <View style={globalStyles.formBox}>
        <Text style={globalStyles.title}>Registro de Vehículo</Text>
        {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

        <TextInput
          placeholder="Placa"
          value={placa}
          onChangeText={setPlaca}
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Marca"
          value={marca}
          onChangeText={setMarca}
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Número de Serie"
          value={numeroSerie}
          onChangeText={setNumeroSerie}
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="SOAT"
          value={soat}
          onChangeText={setSoat}
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Modelo"
          value={modelo}
          onChangeText={setModelo}
          style={globalStyles.input}
          placeholderTextColor="#999"
        />

        {/* Selector de tipo */}
        <View style={globalStyles.roleSelectorContainer}>
          <Text style={globalStyles.roleSelectorLabel}>Tipo de vehículo:</Text>
          <View style={globalStyles.roleSelectorRow}>
            {['carro', 'SUV', 'camioneta', 'sedan'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[
                  globalStyles.roleSelectorButton,
                  tipo === r && globalStyles.roleSelectorButtonActive,
                ]}
                onPress={() => setTipo(r as any)}
              >
                <Text
                  style={[
                    globalStyles.roleSelectorButtonText,
                    tipo === r && globalStyles.roleSelectorButtonTextActive,
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
          style={globalStyles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Capacidad"
          value={capacidad}
          onChangeText={setCapacidad}
          style={globalStyles.input}
          placeholderTextColor="#999"
          keyboardType="numeric"
        />

        <TouchableOpacity style={globalStyles.button} onPress={handleRegisterVehicle}>
          <Text style={globalStyles.buttonText}>Registrar Vehículo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={globalStyles.link}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
