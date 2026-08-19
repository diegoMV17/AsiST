import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute, NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import globalStyles from "../../styles/styles";

const HomeDriverScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { nombre = "Conductor" } = (route.params || {}) as { nombre?: string };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <StatusBar barStyle="light-content" backgroundColor="#00205B" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitial}>{nombre.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.welcomeLabel}>Bienvenido de nuevo</Text>
        <Text style={styles.userName}>{nombre}</Text>
        <View style={styles.roleBadge}>
          <Icon name="car" size={14} color="#bfdbfe" />
          <Text style={styles.roleText}>Conductor</Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>

        <Text style={styles.sectionLabel}>¿Qué quieres hacer?</Text>

        {/* ── Card: Publicar viaje ── */}
        <TouchableOpacity
          style={[styles.actionCard, styles.actionCardAccent]}
          onPress={() => navigation.navigate("CreateTripScreen")}
          activeOpacity={0.85}
        >
          <View style={[styles.iconBox, { backgroundColor: '#f0fdf4' }]}>
            <Icon name="plus-circle-outline" size={32} color="#16a34a" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardActionTitle}>Publicar un Viaje</Text>
            <Text style={styles.cardActionSubtitle}>Crea un nuevo viaje y acepta pasajeros</Text>
          </View>
          <Icon name="chevron-right" size={22} color="#94a3b8" />
        </TouchableOpacity>

        {/* ── Card: Mis viajes activos ── */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("SeeTripsScreen")}
          activeOpacity={0.85}
        >
          <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
            <Icon name="map-marker-path" size={32} color="#1d4ed8" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardActionTitle}>Mis Viajes Activos</Text>
            <Text style={styles.cardActionSubtitle}>Gestiona y finaliza tus viajes en curso</Text>
          </View>
          <Icon name="chevron-right" size={22} color="#94a3b8" />
        </TouchableOpacity>

        {/* ── Card: Historial ── */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("SeeTripsScreen")}
          activeOpacity={0.85}
        >
          <View style={[styles.iconBox, { backgroundColor: '#fefce8' }]}>
            <Icon name="history" size={32} color="#ca8a04" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardActionTitle}>Historial de Viajes</Text>
            <Text style={styles.cardActionSubtitle}>Consulta los viajes que has realizado</Text>
          </View>
          <Icon name="chevron-right" size={22} color="#94a3b8" />
        </TouchableOpacity>

        {/* ── Stats ── */}
        <Text style={[styles.sectionLabel, { marginTop: 8 }]}>Tu actividad</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Viajes{'\n'}realizados</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Viajes{'\n'}activos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Calificación{'\n'}promedio</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

export default HomeDriverScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00205B',
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1e3a8a',
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  welcomeLabel: {
    color: '#93c5fd',
    fontSize: 13,
  },
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  roleText: {
    color: '#bfdbfe',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    gap: 14,
  },
  actionCardAccent: {
    borderWidth: 1.5,
    borderColor: '#bbf7d0',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardActionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardActionSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00205B',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
});