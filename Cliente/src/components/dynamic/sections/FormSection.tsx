
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import GenericForm from '../../forms/genericForm';
import { FormSectionConfig } from '../types';

// ============================================
// PROPS
// ============================================
interface FormSectionProps {
  config: FormSectionConfig;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
/**
 * FormSection es un wrapper que envuelve GenericForm en un ScrollView
 * para que cada sección de formulario maneje su propio scroll
 */
export default function FormSection({ config }: FormSectionProps) {
  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <GenericForm
        fields={config.fields}
        onSubmit={config.onSubmit}
        submitButtonText={config.submitButtonText}
        showCancelButton={config.showCancelButton}
        onCancel={config.onCancel}
        cancelButtonText={config.cancelButtonText}
        initialValues={config.initialValues}
        title={config.title}
        subtitle={config.subtitle}
      />
    </ScrollView>
  );
}

// ============================================
// ESTILOS
// ============================================
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});