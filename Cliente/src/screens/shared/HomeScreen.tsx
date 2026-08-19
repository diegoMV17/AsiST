import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import globalStyles from '../../styles/styles';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Hero ── */}
        <ImageBackground
          source={require("../../../assets/AsiSTU.png")}
          style={styles.heroImage}
          imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}>
              <Icon name="car-multiple" size={14} color="#bfdbfe" />
              <Text style={styles.heroBadgeText}>Universidad Santo Tomás</Text>
            </View>
            <Text style={styles.heroTitle}>AisteU</Text>
            <Text style={styles.heroSubtitle}>Sistema de Viajes Compartidos</Text>
            <Text style={styles.heroTagline}>Movilidad colaborativa para la comunidad tomasina</Text>
          </View>
        </ImageBackground>

        {/* ── Stats rápidas ── */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>+200</Text>
            <Text style={styles.statLabel}>Usuarios</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>+500</Text>
            <Text style={styles.statLabel}>Viajes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>-40%</Text>
            <Text style={styles.statLabel}>Emisiones CO₂</Text>
          </View>
        </View>

        {/* ── Bienvenida ── */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.subtitle}>¿Qué es AisteU?</Text>
          <Text style={globalStyles.normalText}>
            La plataforma oficial de movilidad colaborativa de la Universidad Santo Tomás.
            Conectamos a nuestra comunidad universitaria para optimizar los desplazamientos
            diarios de manera segura, económica y sostenible.
          </Text>
        </View>

        {/* ── Beneficios ── */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.subtitle}>Beneficios Principales</Text>
          <View style={globalStyles.benefitsList}>
            {[
              { icon: 'cash-multiple',       color: '#16a34a', bg: '#f0fdf4', title: 'Ahorro Económico',       desc: 'Reduce costos de transporte compartiendo gastos de combustible y peajes.' },
              { icon: 'leaf',                color: '#0891b2', bg: '#ecfeff', title: 'Impacto Ambiental',      desc: 'Contribuye a la reducción de emisiones de CO₂ y al cuidado del medio ambiente.' },
              { icon: 'account-group',       color: '#7c3aed', bg: '#f5f3ff', title: 'Comunidad',             desc: 'Fortalece relaciones interpersonales dentro de la comunidad tomasina.' },
              { icon: 'clock-fast',          color: '#ca8a04', bg: '#fefce8', title: 'Optimización de Tiempo', desc: 'Coordina horarios y rutas para maximizar la eficiencia en tus desplazamientos.' },
            ].map((b, i) => (
              <View key={i} style={globalStyles.benefitItem}>
                <View style={[styles.benefitIconBox, { backgroundColor: b.bg }]}>
                  <Icon name={b.icon as any} size={22} color={b.color} />
                </View>
                <View style={globalStyles.benefitContent}>
                  <Text style={globalStyles.benefitTitle}>{b.title}</Text>
                  <Text style={globalStyles.benefitDescription}>{b.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── ¿Quién puede participar? ── */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.subtitle}>¿Quién Puede Participar?</Text>
          <View style={globalStyles.audienceContainer}>
            {[
              { icon: 'school',        label: 'Estudiantes de pregrado y posgrado' },
              { icon: 'briefcase',     label: 'Personal administrativo' },
            ].map((a, i) => (
              <View key={i} style={globalStyles.audienceItem}>
                <Icon name={a.icon as any} size={22} color="#00205B" style={{ marginRight: 10 }} />
                <Text style={globalStyles.audienceText}>{a.label}</Text>
              </View>
            ))}
          </View>
          <Text style={globalStyles.requirementText}>
            * Requiere correo institucional activo (@ustadistancia.edu.co)
          </Text>
        </View>

        {/* ── Funcionalidades ── */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.subtitle}>Funcionalidades Principales</Text>
          <View style={styles.featureGrid}>
            {[
              { icon: 'shield-lock-outline',    label: 'Autenticación segura' },
              { icon: 'car-outline',             label: 'Registro conductor / pasajero' },
              { icon: 'map-outline',             label: 'Rutas personalizadas' },
              { icon: 'map-marker-outline',      label: 'Puntos de encuentro' },
              { icon: 'star-outline',            label: 'Calificaciones y reputación' },
              { icon: 'bell-outline',            label: 'Notificaciones en tiempo real' },
              { icon: 'history',                 label: 'Historial de viajes' },
              { icon: 'chat-outline',            label: 'Chat integrado' },
            ].map((f, i) => (
              <View key={i} style={styles.featureItem}>
                <View style={styles.featureIconBox}>
                  <Icon name={f.icon as any} size={20} color="#00205B" />
                </View>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Seguridad ── */}
        <View style={[globalStyles.section, styles.securitySection]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon name="shield-check" size={22} color="#00205B" />
            <Text style={globalStyles.subtitle}>Seguridad y Confianza</Text>
          </View>
          <Text style={globalStyles.normalText}>
            AisteU implementa medidas de seguridad robustas. Todos los participantes verifican
            su identidad con correo institucional, y el sistema de calificaciones promueve
            comportamientos responsables y seguros.
          </Text>
        </View>

        {/* ── Footer ── */}
        <View style={globalStyles.footer}>
          <Icon name="car-multiple" size={24} color="#9ca3af" />
          <Text style={[globalStyles.footerText, { marginTop: 8 }]}>
            © {new Date().getFullYear()} Universidad Santo Tomás
          </Text>
          <Text style={globalStyles.footerSubtext}>AisteU — Sistema de Viajes Compartidos</Text>
          <Text style={globalStyles.versionText}>Versión 2.0</Text>
        </View>

      </ScrollView>

      {/* ── Botones fijos — sin cambios ── */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={globalStyles.primaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.secondaryButton, { marginTop: 10 }]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={globalStyles.secondaryButtonText}>Crear Cuenta Nueva</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 148,
  },

  // Hero
  heroImage: {
    width: '100%',
    height: 280,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 32, 91, 0.65)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: '#bfdbfe',
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    marginTop: 4,
    fontWeight: '500',
  },
  heroTagline: {
    fontSize: 13,
    color: '#93c5fd',
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#00205B',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 1,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#93c5fd',
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 4,
  },

  // Beneficios
  benefitIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    flexShrink: 0,
  },

  // Funcionalidades grid
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  featureItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  featureIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureLabel: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    lineHeight: 16,
  },

  // Seguridad
  securitySection: {
    borderLeftWidth: 4,
    borderLeftColor: '#00205B',
  },

  // Botones fijos
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
});

export default HomeScreen;