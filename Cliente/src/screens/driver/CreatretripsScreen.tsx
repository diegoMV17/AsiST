import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUserVehicles } from '../../api/UserApi';
import { obtenerToken, obtenerUsuarioDesdeToken } from '../../auth/authService';
import globalStyles from '../../styles/styles';
import { createTrip } from '../../api/tripApi';

export default function CreateTripsScreen({ navigation }: any) {
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

      setOrigen('');
      setDestino('');
      setFecha('');
      setHora('');
      setCuposDisponibles('');
      setDescripcion('');
      setVehicleId('');

      alert('Viaje creado exitosamente');
    } catch (err) {
      setError('Error al crear el viaje. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={styles.headerIcon}>
            <Icon name="map-marker-plus-outline" size={28} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>Crear Nuevo Viaje</Text>
          <Text style={styles.headerSubtitle}>Comparte tu viaje con otros pasajeros</Text>
        </View>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Error general ── */}
        {error ? (
          <View style={styles.errorBanner}>
            <Icon name="alert-circle-outline" size={18} color="#dc2626" />
            <Text style={globalStyles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* ── Sección: Vehículo ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="car-outline" size={18} color="#00205B" />
            <Text style={styles.sectionTitle}>Vehículo</Text>
          </View>

          <Text style={globalStyles.label}>
            Selecciona tu vehículo <Text style={{ color: '#dc2626' }}>*</Text>
          </Text>

          {loading ? (
            <View style={styles.pickerLoading}>
              <ActivityIndicator size="small" color="#00205B" />
              <Text style={{ color: '#6b7280', marginLeft: 8, fontSize: 14 }}>Cargando vehículos...</Text>
            </View>
          ) : (
            <View style={[globalStyles.pickerWrapper, vehicleId ? styles.pickerSelected : null]}>
              {vehicleId ? (
                <Icon name="check-circle" size={18} color="#16a34a" style={{ marginRight: 6 }} />
              ) : (
                <Icon name="car-multiple" size={18} color="#94a3b8" style={{ marginRight: 6 }} />
              )}
              <Picker
                selectedValue={vehicleId}
                style={globalStyles.picker}
                onValueChange={(value) => setVehicleId(value)}
                dropdownIconColor="#666"
              >
                <Picker.Item label="Selecciona un vehículo" value="" />
                {vehicles.map((veh) => (
                  <Picker.Item key={veh._id} label={`${veh.placa} · ${veh.marca ?? ''}`} value={veh._id} />
                ))}
              </Picker>
            </View>
          )}
        </View>

        {/* ── Sección: Ruta ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="map-marker-path" size={18} color="#00205B" />
            <Text style={styles.sectionTitle}>Ruta</Text>
          </View>

          <Text style={globalStyles.label}>
            Origen <Text style={{ color: '#dc2626' }}>*</Text>
          </Text>
          <View style={styles.inputRow}>
            <Icon name="map-marker-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              placeholder="Ej: Tunja - UPTC"
              value={origen}
              onChangeText={setOrigen}
              style={styles.inputWithIcon}
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Flecha visual entre origen y destino */}
          <View style={styles.routeArrow}>
            <View style={styles.routeLine} />
            <Icon name="arrow-down" size={16} color="#94a3b8" />
            <View style={styles.routeLine} />
          </View>

          <Text style={globalStyles.label}>
            Destino <Text style={{ color: '#dc2626' }}>*</Text>
          </Text>
          <View style={styles.inputRow}>
            <Icon name="map-marker" size={18} color="#00205B" style={styles.inputIcon} />
            <TextInput
              placeholder="Ej: Duitama - Terminal"
              value={destino}
              onChangeText={setDestino}
              style={styles.inputWithIcon}
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        {/* ── Sección: Fecha y hora ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="calendar-clock" size={18} color="#00205B" />
            <Text style={styles.sectionTitle}>Fecha y Hora</Text>
          </View>

          <View style={styles.twoColumns}>
            <View style={{ flex: 1 }}>
              <Text style={globalStyles.label}>
                Fecha <Text style={{ color: '#dc2626' }}>*</Text>
              </Text>
              <View style={styles.inputRow}>
                <Icon name="calendar-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  placeholder="YYYY-MM-DD"
                  value={fecha}
                  onChangeText={setFecha}
                  style={styles.inputWithIcon}
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            <View style={{ width: 12 }} />

            <View style={{ flex: 1 }}>
              <Text style={globalStyles.label}>
                Hora <Text style={{ color: '#dc2626' }}>*</Text>
              </Text>
              <View style={styles.inputRow}>
                <Icon name="clock-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  placeholder="HH:MM"
                  value={hora}
                  onChangeText={setHora}
                  style={styles.inputWithIcon}
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>
          </View>
        </View>

        {/* ── Sección: Detalles ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="information-outline" size={18} color="#00205B" />
            <Text style={styles.sectionTitle}>Detalles del viaje</Text>
          </View>

          <Text style={globalStyles.label}>
            Cupos disponibles <Text style={{ color: '#dc2626' }}>*</Text>
          </Text>
          <View style={styles.inputRow}>
            <Icon name="account-group-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              placeholder="Ej: 3"
              value={cupos_disponibles}
              onChangeText={setCuposDisponibles}
              style={styles.inputWithIcon}
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              maxLength={1}
            />
          </View>
          <Text style={styles.hintText}>
            <Icon name="information-outline" size={11} color="#94a3b8" /> Sin contar al conductor
          </Text>

          <Text style={[globalStyles.label, { marginTop: 12 }]}>Descripción</Text>
          <View style={[styles.inputRow, { alignItems: 'flex-start', paddingTop: 12 }]}>
            <Icon name="text-box-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              placeholder="Ej: Salida puntual desde la portería UPTC. Sin paradas intermedias."
              value={descripcion}
              onChangeText={setDescripcion}
              style={[styles.inputWithIcon, { height: 80, textAlignVertical: 'top' }]}
              placeholderTextColor="#94a3b8"
              multiline
            />
          </View>
          <Text style={styles.hintText}>Opcional — ayuda a los pasajeros a conocer más detalles</Text>
        </View>

        {/* ── Resumen rápido ── */}
        {(origen || destino || fecha) ? (
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <Icon name="eye-outline" size={16} color="#1d4ed8" />
              <Text style={styles.previewTitle}>Vista previa del viaje</Text>
            </View>
            {origen || destino ? (
              <Text style={styles.previewRoute}>
                {origen || '?'} → {destino || '?'}
              </Text>
            ) : null}
            {fecha || hora ? (
              <Text style={styles.previewDetail}>
                📅 {fecha || '?'}  🕐 {hora || '?'}
              </Text>
            ) : null}
            {cupos_disponibles ? (
              <Text style={styles.previewDetail}>
                👥 {cupos_disponibles} cupo{Number(cupos_disponibles) !== 1 ? 's' : ''} disponible{Number(cupos_disponibles) !== 1 ? 's' : ''}
              </Text>
            ) : null}
          </View>
        ) : null}

        {/* ── Botones ── */}
        <View style={{ gap: 12, marginTop: 8, marginBottom: 16 }}>
          <TouchableOpacity
            style={[globalStyles.button, isSubmitting && globalStyles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Icon name="send-outline" size={18} color="#fff" />
                <Text style={globalStyles.buttonText}>Publicar Viaje</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={globalStyles.secondaryButton}
            onPress={() => navigation?.goBack()}
            disabled={isSubmitting}
          >
            <Text style={globalStyles.secondaryButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00205B',
    paddingTop: 44,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#93c5fd',
    fontSize: 13,
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#F5F7FA',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  pickerLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  pickerSelected: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    padding: 0,
  },
  routeArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginLeft: 16,
    gap: 4,
  },
  routeLine: {
    width: 1,
    height: 12,
    backgroundColor: '#d1d5db',
  },
  twoColumns: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hintText: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
    marginLeft: 2,
  },
  previewCard: {
    backgroundColor: '#eff6ff',
    borderWidth: 1.5,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  previewTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  previewRoute: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  previewDetail: {
    fontSize: 13,
    color: '#475569',
    marginTop: 2,
  },
});