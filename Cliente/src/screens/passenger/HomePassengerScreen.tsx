import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute, NavigationProp, RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../styles/styles";

type ParamsType = { nombre?: string };

const HomePassengerScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<Record<string, ParamsType>, string>>();
  const nombre = route.params?.nombre || "Pasajero";

  const goToRutasDisponibles = () => {
    Alert.alert("Rutas", "Aquí se mostrarán las rutas disponibles.");
    // navigation.navigate('RutasDisponiblesScreen');
  };

  const goToHistorial = () => {
    Alert.alert("Historial", "Aquí se mostrará tu historial de viajes.");
    // navigation.navigate('HistorialPasajeroScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View >
        <Text style={styles.title}>Panel de Pasajero</Text>
        <Text style={styles.normalText}>
          ¡Bienvenido, {nombre}! Has ingresado correctamente como pasajero.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.formBox}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={goToRutasDisponibles}
        >
          <Icon name="map-search" size={24} color="#fff" />
          <Text>Ver Rutas Disponibles</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToHistorial}
        >
          <Icon name="history" size={24} color="#fff" />
          <Text>Historial de Viajes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomePassengerScreen;