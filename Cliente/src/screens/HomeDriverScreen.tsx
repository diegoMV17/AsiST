import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const HomeDriverScreen = ({ route }: any) => {
  // Supón que recibes el nombre del admin por params o contexto
  const nombre = route?.params?.nombre || 'Conductor';

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Panel de Conductor</Text>
        <Text style={styles.normalText}>
          ¡Bienvenido, {nombre}! Has ingresado correctamente como Conductor.
        </Text>
      </View>
    </View>
  );
};

export default HomeDriverScreen;