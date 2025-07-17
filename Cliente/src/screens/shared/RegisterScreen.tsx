import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../styles/styles';
import { isValidDomainEmail, validateLogin } from '../../authentication/LoginAuth';
import { registerUser } from '../../connection/UserServerConnection';

export default function RegisterScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cedula, setCedula] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'conductor' | 'pasajero' | 'ambos' | 'admin'>('pasajero');
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleRegister = async () => {
    if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !cedula.trim() || !fechaNacimiento.trim() || !ciudad.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (!isValidDomainEmail(email)) {
      setError('El correo electrónico debe ser de dominio @usantoto.edu.co o @ustatunjaedu.co');
      return;
    }
    const passwordError = validateLogin(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    setError('');
    try {
      await registerUser(nombre, apellido, telefono, cedula, fechaNacimiento, ciudad, email, password, rol);
      Alert.alert('Registro válido', `Bienvenido/a, ${nombre}`);
      navigation.navigate('Login');
    } catch (err: any) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Registro</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} placeholderTextColor="#999" />
        <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} style={styles.input} placeholderTextColor="#999" />
        <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} style={styles.input} placeholderTextColor="#999" keyboardType="phone-pad" />
        <TextInput placeholder="Cédula" value={cedula} onChangeText={setCedula} style={styles.input} placeholderTextColor="#999" keyboardType="numeric" />
        {Platform.OS === 'web' ? (
          <input
            type="date"
            style={{ ...styles.dateInput, color: fechaNacimiento ? '#000' : '#999' }}
            value={fechaNacimiento}
            onChange={e => setFechaNacimiento(e.target.value)}
          />
        ) : (
          <>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text style={{ color: fechaNacimiento ? '#000' : '#999' }}>
                {fechaNacimiento || 'Fecha de nacimiento (YYYY-MM-DD)'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDate(selectedDate);
                    const formatted = selectedDate.toISOString().split('T')[0];
                    setFechaNacimiento(formatted);
                  }
                }}
                maximumDate={new Date()}
              />
            )}
          </>
        )}
        <TextInput placeholder="Ciudad" value={ciudad} onChangeText={setCiudad} style={styles.input} placeholderTextColor="#999" />
        <TextInput placeholder="Correo institucional" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} placeholderTextColor="#999" />
        <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} placeholderTextColor="#999" />
        {/* Selector de rol */}
        <View style={styles.roleSelectorContainer}>
          <Text style={styles.roleSelectorLabel}>Rol:</Text>
          <View style={styles.roleSelectorRow}>
            {['conductor', 'pasajero', 'ambos'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[
                  styles.roleSelectorButton,
                  rol === r && styles.roleSelectorButtonActive,
                ]}
                onPress={() => setRol(r as any)}
              >
                <Text
                  style={[
                    styles.roleSelectorButtonText,
                    rol === r && styles.roleSelectorButtonTextActive,
                  ]}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            ¿Ya tienes cuenta? Inicia sesión aquí
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}