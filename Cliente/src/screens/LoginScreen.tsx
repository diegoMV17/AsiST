import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { isValidDomainEmail, validateLogin } from '../authentication/LoginAuth';
import { loginUser } from '../connection/UserServerConnection';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    if (!isValidDomainEmail(email)) {
      alert('El correo electrónico debe ser de dominio @usantoto.edu.co o @ustatunjaedu.co');
      return;
    }
    const passwordError = validateLogin(password);
    if (passwordError) {
      alert(passwordError);
      return;
    }
    try {
      const data = await loginUser(email, password);
      if (data) {
        if (data.rol === 'admin') {
          navigation.navigate('HomeAdmin', { nombre: data.nombre });
        } else if (data.rol === 'conductor') {
          navigation.navigate('HomeDriver', { nombre: data.nombre });
        } else if (data.rol === 'pasajero') {
          navigation.navigate('HomePassenger', { nombre: data.nombre });
        } else if (data.rol === 'ambos') {
          navigation.navigate('Home', { nombre: data.nombre });
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>
            ¿No tienes cuenta? Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};