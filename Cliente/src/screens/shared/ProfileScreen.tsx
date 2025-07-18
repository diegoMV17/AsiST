import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../styles/styles';
import { cerrarSesion, obtenerUsuarioDesdeToken, obtenerToken } from '../../auth/authService';
import { getUserData } from '../../api/UserApi';

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cedula, setCedula] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    const cargarUsuario = async () => {
      const usuario = await obtenerUsuarioDesdeToken();
      const token = await obtenerToken();

      if (usuario?.id && token) {
        try {
          const response = await getUserData(usuario.id, token);

          if (response) {
            setUser(response);
            setNombre(response.nombre || '');
            setApellido(response.apellido || '');
            setTelefono(response.telefono || '');
            setCedula(response.cedula || '');
            setFechaNacimiento(response.fechaNacimiento || '');
            setCiudad(response.ciudad || '');
            setCorreo(response.correo || '');
            setRol(response.rol || '');
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario', error);
        }
      }
    };

    cargarUsuario();
  }, []);

  const handleLogout = async () => {
    await cerrarSesion();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
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

        <Text>Correo institucional</Text>
        <Text>{correo}</Text>

        <Text>Rol</Text>
        <Text>{rol}</Text>

        <Text>Nombre</Text>
        <TextInput
          value={nombre}
          editable={editing}
          onChangeText={setNombre}
          style={styles.input}
        />

        <Text>Apellido</Text>
        <TextInput
          value={apellido}
          editable={editing}
          onChangeText={setApellido}
          style={styles.input}
        />

        <Text>Teléfono</Text>
        <TextInput
          value={telefono}
          editable={editing}
          onChangeText={setTelefono}
          style={styles.input}
          keyboardType="phone-pad"
        />

        <Text>Cédula</Text>
        <TextInput
          value={cedula}
          editable={editing}
          onChangeText={setCedula}
          style={styles.input}
          keyboardType="numeric"
        />

        <Text>Fecha de Nacimiento</Text>
        <TextInput
          value={fechaNacimiento}
          editable={editing}
          onChangeText={setFechaNacimiento}
          style={styles.input}
          placeholder="YYYY-MM-DD"
        />

        <Text>Ciudad</Text>
        <TextInput
          value={ciudad}
          editable={editing}
          onChangeText={setCiudad}
          style={styles.input}
        />

        {editing && (
          <>
            <Text>Nueva Contraseña (opcional)</Text>
            <TextInput
              value={contraseña}
              onChangeText={setContraseña}
              style={styles.input}
              secureTextEntry
              placeholder="Dejar en blanco si no desea cambiarla"
            />
          </>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: editing ? 'green' : '#007bff' }]}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.buttonText}>
            {editing ? 'Guardar cambios' : 'Editar perfil'}
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
          style={[styles.button, { backgroundColor: 'crimson', marginTop: 20 }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
