import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export default function CreateTripsScreen() {
  const [formData, setFormData] = useState({
    driverId: '',
    vehicleId: '',
    origen: '',
    destino: '',
    fecha: '',
    hora: '',
    descripcion: '',
    cupos_disponibles: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    // Simulación de carga de vehículos, reemplaza por tu API
    setVehicles([
      { id: 'V123', placa: 'ABC123', modelo: 'Mazda 3' },
      { id: 'V456', placa: 'XYZ789', modelo: 'Renault Logan' },
    ]);
    // Si tienes el driverId del usuario logueado, asígnalo aquí
    // setFormData(prev => ({ ...prev, driverId: usuario.id }));
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.driverId.trim()) newErrors.driverId = 'El ID del conductor es obligatorio';
    if (!formData.vehicleId.trim()) newErrors.vehicleId = 'El ID del vehículo es obligatorio';
    if (!formData.origen.trim()) newErrors.origen = 'El origen es obligatorio';
    if (!formData.destino.trim()) newErrors.destino = 'El destino es obligatorio';
    if (!formData.fecha.trim()) newErrors.fecha = 'La fecha es obligatoria';
    if (!formData.hora.trim()) newErrors.hora = 'La hora es obligatoria';
    if (!formData.cupos_disponibles.trim()) {
      newErrors.cupos_disponibles = 'Los cupos disponibles son obligatorios';
    } else if (isNaN(Number(formData.cupos_disponibles)) || Number(formData.cupos_disponibles) <= 0) {
      newErrors.cupos_disponibles = 'Debe ser un número válido mayor a 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }
    setIsSubmitting(true);
    try {
      const tripData = {
        driverId: formData.driverId,
        vehicleId: formData.vehicleId,
        origen: formData.origen,
        destino: formData.destino,
        fecha: formData.fecha,
        hora: formData.hora,
        descripcion: formData.descripcion,
        cupos_disponibles: Number(formData.cupos_disponibles),
      };
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert(
        'Éxito',
        'Viaje creado correctamente. Tu viaje ya está disponible para otros usuarios.',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                driverId: '',
                vehicleId: '',
                origen: '',
                destino: '',
                fecha: '',
                hora: '',
                descripcion: '',
                cupos_disponibles: '',
              });
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el viaje. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({
    icon,
    placeholder,
    value,
    onChangeText,
    error,
    keyboardType = 'default',
    multiline = false
  }: {
    icon: string;
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    error?: string;
    keyboardType?: any;
    multiline?: boolean;
  }) => (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
      
        <TextInput
          style={[
            styles.input,
            multiline && styles.textArea,
            error && styles.inputError
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          placeholderTextColor="#999"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="car-sport" size={32} color="#2563eb" />
          <Text style={styles.title}>Crear Nuevo Viaje</Text>
          <Text style={styles.subtitle}>
            Comparte tu viaje y conecta con otros pasajeros
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            icon="person"
            placeholder="ID del conductor"
            value={formData.driverId}
            onChangeText={(value) => handleInputChange('driverId', value)}
            error={errors.driverId}
          />

          {/* Picker para seleccionar vehículo */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="car" size={20} color="#666" style={styles.inputIcon} />
              <Picker
                selectedValue={formData.vehicleId}
                style={{ flex: 1, height: 50 }}
                onValueChange={(value) => handleInputChange('vehicleId', value)}
              >
                <Picker.Item label="Selecciona un vehículo" value="" />
                {vehicles.map((veh) => (
                  <Picker.Item
                    key={veh.id}
                    label={`${veh.modelo} - ${veh.placa}`}
                    value={veh.id}
                  />
                ))}
              </Picker>
            </View>
            {errors.vehicleId && <Text style={styles.errorText}>{errors.vehicleId}</Text>}
          </View>

          <InputField
            icon="location"
            placeholder="Ciudad o dirección de origen"
            value={formData.origen}
            onChangeText={(value) => handleInputChange('origen', value)}
            error={errors.origen}
          />

          <InputField
            icon="location-outline"
            placeholder="Ciudad o dirección de destino"
            value={formData.destino}
            onChangeText={(value) => handleInputChange('destino', value)}
            error={errors.destino}
          />

          <InputField
            icon="calendar"
            placeholder="Fecha (YYYY-MM-DD)"
            value={formData.fecha}
            onChangeText={(value) => handleInputChange('fecha', value)}
            error={errors.fecha}
          />

          <InputField
            icon="time"
            placeholder="Hora (HH:MM)"
            value={formData.hora}
            onChangeText={(value) => handleInputChange('hora', value)}
            error={errors.hora}
          />

          <InputField
            icon="people"
            placeholder="Cupos disponibles"
            value={formData.cupos_disponibles}
            onChangeText={(value) => handleInputChange('cupos_disponibles', value)}
            keyboardType="numeric"
            error={errors.cupos_disponibles}
          />

          <InputField
            icon="document-text"
            placeholder="Descripción (opcional) - Agrega detalles adicionales sobre el viaje"
            value={formData.descripcion}
            onChangeText={(value) => handleInputChange('descripcion', value)}
            multiline={true}
          />

          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Creando Viaje...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name="add-circle" size={20} color="#fff" />
                <Text style={styles.buttonText}>Crear Viaje</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Al crear un viaje, aceptas nuestros términos y condiciones de uso.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#374151',
    paddingRight: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 10,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});