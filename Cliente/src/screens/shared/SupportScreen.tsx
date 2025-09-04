import React from 'react';
import { View, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from '../../styles/styles';

export default function SupportScreen() {
  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Soporte y Ayuda</Text>

      <Text style={globalStyles.normalText}>
        Si tienes algún problema, duda o sugerencia sobre la aplicación, por favor ponte en contacto con nuestro equipo de soporte.
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL('mailto:soporte@usantoto.edu.co')} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Enviar Correo a Soporte</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={globalStyles.subtitle}>Preguntas Frecuentes</Text>
        <Text style={globalStyles.normalText}>• ¿Cómo registro un viaje?</Text>
        <Text style={globalStyles.normalText}>• ¿Qué hago si olvido mi contraseña?</Text>
        <Text style={globalStyles.normalText}>• ¿Cómo cambio mi rol de pasajero a conductor?</Text>
      </View>
    </ScrollView>
  );
}
