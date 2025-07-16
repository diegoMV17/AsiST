import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { updateUser } from '../connection/UserServerConnection';

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const data = await AsyncStorage.getItem('usuario');
      if (data) {
        const parsed = JSON.parse(data);
        setUser(parsed);
        setNombre(parsed.nombre);
        setTelefono(parsed.telefono);
        setCiudad(parsed.ciudad);
        setRol(parsed.rol);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      await updateUser(user.id, {
        nombre,
        telefono,
        ciudad,
        ...(password && { password }), // Solo si cambia la contraseña
      });
      const updatedUser = { ...user, nombre, telefono, ciudad };
      await AsyncStorage.setItem('usuario', JSON.stringify(updatedUser));
      Alert.alert('✅ Actualizado', 'Tus datos fueron actualizados');
      setEditing(false);
    } catch (err) {
      Alert.alert('❌ Error', 'No se pudieron guardar los cambios');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuario');
    navigation.replace('Login');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Mi Perfil</Text>

        <Text >Correo institucional</Text>
        <Text >{user.correo}</Text>

        <Text >Rol</Text>
        <Text >{rol}</Text>

        <Text >Nombre</Text>
        <TextInput
          value={nombre}
          editable={editing}
          onChangeText={setNombre}
          style={styles.input}
        />

        <Text >Teléfono</Text>
        <TextInput
          value={telefono}
          editable={editing}
          onChangeText={setTelefono}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <Text >Ciudad</Text>
        <TextInput
          value={ciudad}
          editable={editing}
          onChangeText={setCiudad}
          style={styles.input}
        />

        {editing && (
          <>
            <Text >Nueva Contraseña (opcional)</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={editing ? handleSave : () => setEditing(true)}
        >
          <Text style={styles.buttonText}>
            {editing ? 'Guardar cambios' : 'Editar datos'}
          </Text>
        </TouchableOpacity>

        {editing && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#888' }]}
            onPress={() => setEditing(false)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#e11d48', marginTop: 20 }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
