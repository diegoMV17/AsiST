import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a AsiST</Text>
      <Text style={styles.normalText}>
        Tu app de movilidad universitaria. Ingresa para comenzar a usar todas las funciones.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Ir al Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;