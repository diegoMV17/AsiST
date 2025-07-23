import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../styles/styles";

const HomeBothScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { nombre = "Ambos" } = (route.params || {}) as { nombre?: string };

  const goToHistorial = () => {
    Alert.alert("Historial", "Aquí iría el historial del usuario con rol ambos.");
    // navigation.navigate('HistorialScreen');
  };

  const goToRutas = () => {
    Alert.alert("Rutas", "Aquí irían las rutas del usuario con rol ambos.");
    // navigation.navigate('RutasScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View>
        <Text style={styles.title}>Panel de Ambos</Text>
        <Text style={styles.normalText}>
          ¡Bienvenido, {nombre}! Has ingresado correctamente como usuario con rol ambos.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.formBox}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={goToRutas}>
          <Icon name="map-marker-path" size={24} color="#fff" />
          <Text>Ver mis Rutas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToHistorial}>
          <Icon name="history" size={24} color="#fff" />
          <Text>Historial de Viajes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeBothScreen;
