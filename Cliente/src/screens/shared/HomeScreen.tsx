import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.mainTitle}>AisteU</Text>
        <Text style={styles.subtitle}>Sistema de Viajes Compartidos</Text>
        <Text style={styles.universityName}>Universidad Santo Tomás</Text>
      </View>
      {/* Imagen de bienvenida */}
      <Image
        style={styles.headerImage}
        resizeMode="contain"
      />
      {/* Welcome Section */}
      <View style={styles.section}>
        <Text style={styles.welcomeText}>
          Bienvenido a la plataforma oficial de movilidad colaborativa de la Universidad Santo Tomás. AisteU conecta a
          nuestra comunidad universitaria para optimizar los desplazamientos diarios de manera segura, económica y
          sostenible.
        </Text>
      </View>

      

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
      

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} Universidad Santo Tomás</Text>
        <Text style={styles.footerSubtext}>AisteU - Sistema de Viajes Compartidos</Text>
        <Text style={styles.versionText}>Versión 2.0</Text>
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
    width: 180,
    height: 120,
    marginBottom: 12,
    alignSelf: "center",
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
})

export default HomeScreen
