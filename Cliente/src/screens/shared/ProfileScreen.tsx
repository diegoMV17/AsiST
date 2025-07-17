import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../styles/styles';
import { updateUser } from '../../connection/UserServerConnection';

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

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

      

        {editing && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#888' }]}
            onPress={() => setEditing(false)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
