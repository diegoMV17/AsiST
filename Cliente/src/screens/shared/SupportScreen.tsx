import React from 'react';
import { View, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/styles';

export default function SupportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Soporte y Ayuda</Text>

      <Text style={styles.normalText}>
        Si tienes algún problema, duda o sugerencia sobre la aplicación, por favor ponte en contacto con nuestro equipo de soporte.
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL('mailto:soporte@usantoto.edu.co')} style={styles.button}>
        <Text style={styles.buttonText}>Enviar Correo a Soporte</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.subtitle}>Preguntas Frecuentes</Text>
        <Text style={styles.normalText}>• ¿Cómo registro un viaje?</Text>
        <Text style={styles.normalText}>• ¿Qué hago si olvido mi contraseña?</Text>
        <Text style={styles.normalText}>• ¿Cómo cambio mi rol de pasajero a conductor?</Text>
      </View>
    </ScrollView>
  );
}
