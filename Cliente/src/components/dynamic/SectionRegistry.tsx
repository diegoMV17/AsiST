// src/components/dynamic/SectionRegistry.tsx

import React from 'react';
import { SectionType } from './types';

// Importar secciones implementadas
import FormSection from './sections/FormSection';

// ============================================
// REGISTRO DE COMPONENTES
// ============================================
// Este objeto mapea cada tipo de sección a su componente React
export const SECTION_REGISTRY: Record<SectionType, React.ComponentType<any> | null> = {
  form: FormSection,        // ✅ Implementaremos en Sesión 3
  cardList: null,           // ⏳ Por implementar
  cardGrid: null,           // ⏳ Por implementar
  banner: null,             // ⏳ Por implementar
  list: null,               // ⏳ Por implementar
  filter: null,             // ⏳ Por implementar
  map: null,                // ⏳ Por implementar
  stats: null,              // ⏳ Por implementar
  tabs: null,               // ⏳ Por implementar
  header: null,             // ⏳ Por implementar
};

// ============================================
// HELPER: OBTENER COMPONENTE POR TIPO
// ============================================
/**
 * Obtiene el componente React correspondiente a un tipo de sección
 * @param type - Tipo de sección
 * @returns Componente React o null si no está implementado
 */
export const getSectionComponent = (type: SectionType): React.ComponentType<any> | null => {
  const Component = SECTION_REGISTRY[type];
  
  if (!Component) {
    console.warn(`⚠️ Section type "${type}" is not implemented yet in registry`);
    return null;
  }
  
  return Component;
};

// ============================================
// HELPER: VERIFICAR SI UN TIPO ESTÁ REGISTRADO
// ============================================
/**
 * Verifica si un tipo de sección está implementado
 * @param type - Tipo de sección
 * @returns true si está implementado, false si no
 */
export const isSectionRegistered = (type: SectionType): boolean => {
  return SECTION_REGISTRY[type] !== null;
};

// ============================================
// HELPER: OBTENER TIPOS REGISTRADOS
// ============================================
/**
 * Obtiene la lista de tipos de sección que están implementados
 * @returns Array de tipos implementados
 */
export const getRegisteredTypes = (): SectionType[] => {
  return Object.entries(SECTION_REGISTRY)
    .filter(([_, component]) => component !== null)
    .map(([type]) => type as SectionType);
};

// ============================================
// COMPONENTE FALLBACK
// ============================================
/**
 * Componente que se muestra cuando una sección no está implementada
 */
export const SectionNotImplemented: React.FC<{ type: string }> = ({ type }) => {
  if (__DEV__) {
    // Solo en desarrollo mostrar advertencia visual
    return (
      <div style={{
        padding: 20,
        margin: 10,
        backgroundColor: '#fff3cd',
        border: '2px dashed #856404',
        borderRadius: 8,
        textAlign: 'center'
      }}>
        <p style={{ color: '#856404', fontWeight: 'bold', margin: 0 }}>
          ⚠️ Section type "{type}" not implemented
        </p>
        <p style={{ color: '#856404', fontSize: 12, margin: '8px 0 0 0' }}>
          Add it to SectionRegistry.tsx
        </p>
      </div>
    );
  }
  
  // En producción no mostrar nada
  return null;
};