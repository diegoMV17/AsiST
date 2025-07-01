import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { isValidDomainEmail, validateLogin } from '../authentication/LoginAuth';

export default function RegisterScreen({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'conductor' | 'pasajero' | 'ambos' | 'admin'>('pasajero');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
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
    // Aquí puedes enviar los datos al servidor
    Alert.alert('Registro válido', `Bienvenido/a, ${nombre}`);
    // navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Registro</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Correo institucional"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />
        {/* Selector de rol simple */}
        <View style={{ width: '100%', marginBottom: 12 }}>
          <Text style={{ marginBottom: 4, color: '#333', fontWeight: '600' }}>Rol:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {['conductor', 'pasajero', 'ambos'].map((r) => (
              <TouchableOpacity
                key={r}
                style={{
                  flex: 1,
                  marginHorizontal: 2,
                  backgroundColor: rol === r ? '#6DC067' : '#eee',
                  borderRadius: 6,
                  paddingVertical: 8,
                  alignItems: 'center',
                }}
                onPress={() => setRol(r as any)}
              >
                <Text style={{ color: rol === r ? '#fff' : '#333', fontWeight: '600' }}>
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
    </View>
    );
}