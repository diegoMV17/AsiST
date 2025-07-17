import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../../styles/styles";

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView >
      <Text style={styles.title}>Bienvenido a AisteU</Text>

      <Text style={styles.normalText}>
        AisteU es el Sistema de Viajes Compartidos diseñado especialmente para la 
        comunidad de la Universidad Santo Tomás. 
      </Text>

      <Text style={styles.normalText}>
        Esta aplicación busca optimizar el tiempo y los recursos de estudiantes, docentes 
        y administrativos, facilitando la coordinación de viajes compartidos hacia y desde la universidad.
      </Text>

      <Text style={styles.title}>¿Para qué sirve?</Text>
      <Text style={styles.normalText}>
        Permite conectar conductores y pasajeros de la comunidad universitaria para compartir viajes, 
        disminuir costos, promover la sostenibilidad y mejorar la movilidad en la ciudad.
      </Text>

      <Text style={styles.title}>¿Quiénes se benefician?</Text>
      <Text style={styles.normalText}>
        Estudiantes, docentes y administrativos de la Universidad Santo Tomás con correo institucional activo.
      </Text>

      <Text style={styles.title}>Características principales</Text>
      <Text style={styles.normalText}>
        • Registro y autenticación segura con correo institucional {"\n"}
        • Elección de rol: conductor, pasajero o ambos {"\n"}
        • Creación y visualización de rutas {"\n"}
        • Historial de viajes y calificaciones {"\n"}
        • Notificaciones para mantenerte informado
      </Text>

      <Text style={styles.title}>Comienza ahora</Text>
      <Text style={styles.normalText}>
        Si ya tienes una cuenta, inicia sesión. 
        Si aún no la tienes, regístrate y únete a la comunidad.
      </Text>

      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.normalText,
          { marginTop: 30, textAlign: "center", fontSize: 12 },
        ]}
      >
        © {new Date().getFullYear()} Universidad Santo Tomás - AsiST
      </Text>
    </ScrollView>
  );
};

export default HomeScreen;
