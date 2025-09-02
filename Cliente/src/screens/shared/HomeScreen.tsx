import { View, Text, TouchableOpacity, ScrollView, StyleSheet,Image, ImageBackground } from "react-native"

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../../assets/AsiSTU.png")}
        style={styles.headerImage}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.mainTitle}>AisteU</Text>
          <Text style={styles.subtitle}>Sistema de Viajes Compartidos</Text>
          <Text style={styles.universityName}>Universidad Santo Tomás</Text>
        </View>
      </ImageBackground>

      {/* Welcome Section */}
      <View style={styles.section}>
        <Text style={styles.welcomeText}>
          Bienvenido a la plataforma oficial de movilidad colaborativa de la Universidad Santo Tomás. 
          AisteU conecta a nuestra comunidad universitaria para optimizar los desplazamientos diarios 
          de manera segura, económica y sostenible.
        </Text>
      </View>


      {/* Mission Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nuestra Misión</Text>
        <Text style={styles.bodyText}>
          Facilitar la movilidad de estudiantes, docentes y personal administrativo mediante un sistema de viajes
          compartidos que promueva la sostenibilidad, reduzca costos de transporte y fortalezca los vínculos
          comunitarios dentro de nuestra institución.
        </Text>
      </View>

      {/* Benefits Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beneficios Principales</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💰</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Ahorro Económico</Text>
              <Text style={styles.benefitDescription}>
                Reduce significativamente los costos de transporte compartiendo gastos de combustible y peajes.
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🌱</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Impacto Ambiental</Text>
              <Text style={styles.benefitDescription}>
                Contribuye a la reducción de emisiones de CO₂ y al cuidado del medio ambiente.
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🤝</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Comunidad</Text>
              <Text style={styles.benefitDescription}>
                Fortalece las relaciones interpersonales dentro de la comunidad tomasina.
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>⏰</Text>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Optimización de Tiempo</Text>
              <Text style={styles.benefitDescription}>
                Coordina horarios y rutas para maximizar la eficiencia en tus desplazamientos.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Target Audience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Quién Puede Participar?</Text>
        <View style={styles.audienceContainer}>
          <View style={styles.audienceItem}>
            <Text style={styles.audienceIcon}>🎓</Text>
            <Text style={styles.audienceText}>Estudiantes de pregrado y posgrado</Text>
          </View>
          <View style={styles.audienceItem}>
            <Text style={styles.audienceIcon}>👨‍🏫</Text>
            <Text style={styles.audienceText}>Docentes y catedráticos</Text>
          </View>
          <View style={styles.audienceItem}>
            <Text style={styles.audienceIcon}>👥</Text>
            <Text style={styles.audienceText}>Personal administrativo</Text>
          </View>
        </View>
        <Text style={styles.requirementText}>* Requiere correo institucional activo (@ustadistancia.edu.co)</Text>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Funcionalidades Principales</Text>
        <View style={styles.featuresList}>
          <Text style={styles.featureItem}>🔐 Autenticación segura con correo institucional</Text>
          <Text style={styles.featureItem}>🚗 Registro como conductor, pasajero o ambos roles</Text>
          <Text style={styles.featureItem}>🗺️ Creación y gestión de rutas personalizadas</Text>
          <Text style={styles.featureItem}>📍 Geolocalización y puntos de encuentro</Text>
          <Text style={styles.featureItem}>⭐ Sistema de calificaciones y reputación</Text>
          <Text style={styles.featureItem}>📱 Notificaciones en tiempo real</Text>
          <Text style={styles.featureItem}>📊 Historial completo de viajes</Text>
          <Text style={styles.featureItem}>💬 Chat integrado para coordinación</Text>
        </View>
      </View>

      {/* Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seguridad y Confianza</Text>
        <Text style={styles.bodyText}>
          AisteU implementa medidas de seguridad robustas para garantizar la confianza entre usuarios. Todos los
          participantes deben verificar su identidad con correo institucional, y contamos con un sistema de
          calificaciones que promueve comportamientos responsables y seguros.
        </Text>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Únete a la Comunidad AisteU</Text>
        <Text style={styles.ctaText}>
          Comienza a disfrutar de los beneficios de la movilidad colaborativa. Si ya tienes una cuenta, inicia sesión.
          Si eres nuevo, regístrate y forma parte del cambio.
        </Text>

        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 20 }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { marginTop: 12 }]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.secondaryButtonText}>Crear Cuenta Nueva</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} Universidad Santo Tomás</Text>
        <Text style={styles.footerSubtext}>AisteU - Sistema de Viajes Compartidos</Text>
        <Text style={styles.versionText}>Versión 1.0</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerSection: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
    headerImage: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#e2e8f0",
    marginBottom: 4,
  },
  universityName: {
    fontSize: 16,
    color: "#cbd5e1",
    fontStyle: "italic",
  },
  section: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
    textAlign: "center",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4b5563",
    textAlign: "justify",
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  audienceContainer: {
    gap: 12,
    marginBottom: 16,
  },
  audienceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
  },
  audienceIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  audienceText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
  requirementText: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    paddingVertical: 4,
  },
  ctaSection: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
    textAlign: "center",
  },
  ctaText: {
    fontSize: 15,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1e3a8a",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#1e3a8a",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },
  versionText: {
    fontSize: 10,
    color: "#9ca3af",
  },
  overlay: {
    backgroundColor: "rgba(30, 58, 138, 0.55)", // azul oscuro con transparencia
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
  },
  
})

export default HomeScreen
