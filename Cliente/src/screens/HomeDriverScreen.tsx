import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/styles";

const HomeDriverScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { nombre = "Conductor" } = (route.params || {}) as { nombre?: string };

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Seguro que deseas salir?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Salir",
        onPress: async () => {
          await AsyncStorage.removeItem("usuario");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  const goToHistorial = () => {
    Alert.alert("Historial", "Aquí iría el historial del conductor.");
    // navigation.navigate('HistorialScreen');
  };

  const goToRutas = () => {
    Alert.alert("Rutas", "Aquí irían las rutas del conductor.");
    // navigation.navigate('RutasScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View >
        <Text style={styles.title}>Panel de Conductor</Text>
        <Text style={styles.normalText}>
          ¡Bienvenido, {nombre}! Has ingresado correctamente como conductor.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.formBox}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          
          onPress={goToRutas}
        >
          <Icon name="map-marker-path" size={24} color="#fff" />
          <Text >Ver mis Rutas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          
          onPress={goToHistorial}
        >
          <Icon name="history" size={24} color="#fff" />
          <Text >Historial de Viajes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[, { backgroundColor: "#dc2626" }]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={24} color="#fff" />
          <Text >Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeDriverScreen;