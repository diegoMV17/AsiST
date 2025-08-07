import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getUserVehicles } from '../../api/UserApi';
import { obtenerToken, obtenerUsuarioDesdeToken } from '../../auth/authService';
import styles from '../../styles/styles';
import { createTrip } from '../../api/tripApi';


export default function CreateTripsScreen() {
  const [driverId, setDriverId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [cupos_disponibles, setCuposDisponibles] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        const token = await obtenerToken();
        const user = await obtenerUsuarioDesdeToken();

        if (!token || !user?.id) {
          setError('Token o usuario no encontrados');
          return;
        }

        setDriverId(user.id);
        const fetchedVehicles = await getUserVehicles(user.id, token);
        setVehicles(fetchedVehicles.vehicles);
      } catch (err) {
        setError('Error al cargar los vehículos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      if (!driverId || !vehicleId || !origen || !destino || !fecha || !hora || !cupos_disponibles) {
        setError('Por favor, completa todos los campos obligatorios');
        setIsSubmitting(false);
        return;
      }
      const tripdata = {
        driverId,
        vehicleId,
        origen,
        destino,
        fecha,
        hora,
        cuposDisponibles: Number(cupos_disponibles),
        descripcion,
      };
      console.log('Datos del viaje:', tripdata);

      const nuevoViaje = await createTrip(
        driverId,
        vehicleId,
        origen,
        destino,
        fecha,
        hora,
        Number(cupos_disponibles),
        descripcion
      );

      console.log('Viaje creado exitosamente:', nuevoViaje);

      // Opcional: limpiar formulario
      setOrigen('');
      setDestino('');
      setFecha('');
      setHora('');
      setCuposDisponibles('');
      setDescripcion('');
      setVehicleId('');

      // Opcional: navegar o mostrar mensaje
      alert('Viaje creado exitosamente');
    } catch (err) {
      setError('Error al crear el viaje. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formBox}>
          <Text style={styles.title}>Crear Nuevo Viaje</Text>
          <Text style={styles.subtitle}>
            Comparte tu viaje y conecta con otros pasajeros
          </Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Vehículo Picker */}
          <Text style={styles.label}>Selecciona tu vehículo</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vehicleId}
              style={styles.picker}
              onValueChange={(value) => setVehicleId(value)}
              dropdownIconColor="#666"
            >
              <Picker.Item label="Selecciona un vehículo" value="" />
              {vehicles.map((veh) => (
                <Picker.Item key={veh._id} label={veh.placa} value={veh._id} />
              ))}
            </Picker>
          </View>

          {/* Inputs */}
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
            placeholder="Fecha (YYYY-MM-DD)"
            value={fecha}
            onChangeText={setFecha}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Hora (HH:MM)"
            value={hora}
            onChangeText={setHora}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Cupos disponibles"
            value={cupos_disponibles}
            onChangeText={setCuposDisponibles}
            style={styles.input}
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Descripción del viaje (opcional)"
            value={descripcion}
            onChangeText={setDescripcion}
            style={[styles.input, { height: 80 }]}
            placeholderTextColor="#999"
            multiline
          />

          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Crear Viaje</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
