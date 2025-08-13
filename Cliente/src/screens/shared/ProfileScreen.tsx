import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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
      <View style={styles.center}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.email}>{correo}</Text>
        <Text style={styles.role}>{rol}</Text>
      </View>

      {/* Card con formulario */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={nombre} editable={editing} onChangeText={setNombre} />

        <Text style={styles.label}>Apellido</Text>
        <TextInput style={styles.input} value={apellido} editable={editing} onChangeText={setApellido} />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} value={telefono} editable={editing} onChangeText={setTelefono} keyboardType="phone-pad" />

        <Text style={styles.label}>Cédula</Text>
        <TextInput style={styles.input} value={cedula} editable={editing} onChangeText={setCedula} keyboardType="numeric" />

        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TextInput style={styles.input} value={fechaNacimiento} editable={editing} onChangeText={setFechaNacimiento} placeholder="YYYY-MM-DD" />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput style={styles.input} value={ciudad} editable={editing} onChangeText={setCiudad} />

        {editing && (
          <>
            <Text style={styles.label}>Nueva Contraseña (opcional)</Text>
            <TextInput
              style={styles.input}
              value={contraseña}
              onChangeText={setContraseña}
              secureTextEntry
              placeholder="Dejar en blanco si no desea cambiarla"
            />
          </>
        )}

        {/* Botones */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: editing ? '#27ae60' : '#2980b9' }]}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.buttonText}>
            {editing ? 'Guardar cambios' : 'Editar perfil'}
          </Text>
        </TouchableOpacity>

        {editing && (
          <TouchableOpacity style={[styles.button, { backgroundColor: '#95a5a6' }]} onPress={() => setEditing(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.button, { backgroundColor: '#c0392b', marginTop: 10 }]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#2D9CDB',
    paddingVertical: 20,
    alignItems: 'center',
  },
  email: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  role: { color: '#fff', fontSize: 14, marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: { marginTop: 10, fontWeight: '600', color: '#333' },
  input: {
    backgroundColor: '#f1f2f6',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: 'bold' },
});
