// src/components/dynamic/DynamicScreen.tsx

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { ScreenConfig, SectionConfig } from './types';
import { getSectionComponent, SectionNotImplemented } from './SectionRegistry';
import globalStyles from '../../styles/styles';

// ============================================
// PROPS DEL DYNAMIC SCREEN
// ============================================
interface DynamicScreenProps {
  config: ScreenConfig;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function DynamicScreen({ config }: DynamicScreenProps) {
  
  // ============================================
  // LOADING GENERAL
  // ============================================
  // Si la pantalla está en estado de carga, mostrar loading general
  if (config.loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: config.backgroundColor || '#F5F7FA' }]}>
        <ActivityIndicator size="large" color="#00205B" />
        {config.loadingMessage && (
          <Text style={globalStyles.loadingText}>{config.loadingMessage}</Text>
        )}
      </View>
    );
  }

  // ============================================
  // RENDERIZAR SECCIÓN
  // ============================================
  const renderSection = (sectionConfig: SectionConfig) => {
    // Verificar si la sección debe mostrarse
    if (sectionConfig.visible === false) {
      return null;
    }

    // Obtener el componente correspondiente del registry
    const SectionComponent = getSectionComponent(sectionConfig.type);

    // Si no está implementado, mostrar fallback
    if (!SectionComponent) {
      return (
        <SectionNotImplemented 
          key={sectionConfig.id} 
          type={sectionConfig.type} 
        />
      );
    }

    // Renderizar la sección con su configuración
    return (
      <View
        key={sectionConfig.id}
        style={[
          sectionConfig.padding !== false && styles.sectionPadding,
          sectionConfig.backgroundColor && { backgroundColor: sectionConfig.backgroundColor },
          sectionConfig.style,
        ]}
      >
        <SectionComponent config={sectionConfig} />
      </View>
    );
  };

  // ============================================
  // RENDER PRINCIPAL
  // ============================================
  return (
    <View 
      style={[
        styles.container,
        config.backgroundColor && { backgroundColor: config.backgroundColor }
      ]}
    >
      {/* Renderizar todas las secciones */}
      {config.sections.map(section => renderSection(section))}
    </View>
  );
}

// ============================================
// ESTILOS
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  sectionPadding: {
    // Padding por defecto para secciones (puedes ajustarlo)
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});