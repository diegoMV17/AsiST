import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from '../../styles/styles';
import { FieldConfig } from '../dynamic/types';

// ============================================
// PROPS DEL GENERIC FORM
// ============================================
interface GenericFormProps {
  fields: FieldConfig[];                              // Configuración de campos
  onSubmit: (values: Record<string, any>) => Promise<void>; // Callback al enviar
  submitButtonText?: string;                          // Texto del botón
  showCancelButton?: boolean;                         // Mostrar botón cancelar
  onCancel?: () => void;                              // Callback cancelar
  cancelButtonText?: string;                          // Texto botón cancelar
  initialValues?: Record<string, any>;                // Valores iniciales
  title?: string;                                     // Título del form
  subtitle?: string;                                  // Subtítulo
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function GenericForm({
  fields,
  onSubmit,
  submitButtonText = 'Enviar',
  showCancelButton = false,
  onCancel,
  cancelButtonText = 'Cancelar',
  initialValues = {},
  title,
  subtitle,
}: GenericFormProps) {
  
  // ============================================
  // ESTADOS
  // ============================================
  
  // Estado de los valores del formulario
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    fields.forEach(field => {
      initial[field.name] = initialValues[field.name] ?? field.defaultValue ?? '';
    });
    return initial;
  });

  // Estado de errores (por campo)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  // Error general del formulario
  const [generalError, setGeneralError] = useState<string>('');
  
  // Estado de loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados para el date picker (móvil)
  const [showDatePicker, setShowDatePicker] = useState<Record<string, boolean>>({});
  const [tempDates, setTempDates] = useState<Record<string, Date>>({});

  // ============================================
  // FUNCIONES DE MANEJO
  // ============================================
  
  /**
   * Actualiza el valor de un campo
   */
  const updateValue = (fieldName: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
    
    // Limpiar error general
    if (generalError) {
      setGeneralError('');
    }
  };

  /**
   * Valida todos los campos del formulario
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = formValues[field.name];

      // 1. Validar campo requerido
      if (field.required) {
        if (value === undefined || value === null || value === '') {
          newErrors[field.name] = `${field.label || field.placeholder || field.name} es obligatorio`;
          return;
        }
      }

      // Si el campo está vacío y no es requerido, no validar más
      if (!value && !field.required) {
        return;
      }

      // 2. Validar longitud mínima (text)
      if (field.minLength && typeof value === 'string' && value.length < field.minLength) {
        newErrors[field.name] = `Mínimo ${field.minLength} caracteres`;
        return;
      }

      // 3. Validar longitud máxima (text)
      if (field.maxLength && typeof value === 'string' && value.length > field.maxLength) {
        newErrors[field.name] = `Máximo ${field.maxLength} caracteres`;
        return;
      }

      // 4. Validar número mínimo
      if (field.type === 'number' && field.min !== undefined) {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          newErrors[field.name] = 'Debe ser un número válido';
          return;
        }
        if (numValue < field.min) {
          newErrors[field.name] = `Mínimo ${field.min}`;
          return;
        }
      }

      // 5. Validar número máximo
      if (field.type === 'number' && field.max !== undefined) {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          newErrors[field.name] = 'Debe ser un número válido';
          return;
        }
        if (numValue > field.max) {
          newErrors[field.name] = `Máximo ${field.max}`;
          return;
        }
      }

      // 6. Validación personalizada
      if (field.validation) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
          return;
        }
      }
    });

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async () => {
    // Limpiar error general previo
    setGeneralError('');
    
    // Validar formulario
    if (!validateForm()) {
      setGeneralError('Por favor, corrige los errores en el formulario');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formValues);
    } catch (error: any) {
      // Mostrar error general si falla el submit
      setGeneralError(error.message || 'Error al enviar el formulario. Intenta nuevamente.');
      console.error('Error en handleSubmit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // RENDERIZADO DE CAMPOS
  // ============================================
  
  /**
   * Renderiza un campo según su tipo
   */
  const renderField = (field: FieldConfig) => {
    const value = formValues[field.name];
    const error = fieldErrors[field.name];

    // TIPO: MULTISELECT (botones de selección única)
    if (field.type === 'multiselect') {
      return (
        <View key={field.name} style={globalStyles.roleSelectorContainer}>
          {field.label && (
            <Text style={globalStyles.roleSelectorLabel}>{field.label}:</Text>
          )}
          <View style={globalStyles.roleSelectorRow}>
            {field.pickerOptions?.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  globalStyles.roleSelectorButton,
                  value === option.value && globalStyles.roleSelectorButtonActive
                ]}
                onPress={() => updateValue(field.name, option.value)}
              >
                <Text
                  style={[
                    globalStyles.roleSelectorButtonText,
                    value === option.value && globalStyles.roleSelectorButtonTextActive
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {error && <Text style={globalStyles.errorText}>{error}</Text>}
        </View>
      );
    }

    // TIPO: PICKER (dropdown)
    if (field.type === 'picker') {
      return (
        <View key={field.name}>
          {field.label && <Text style={globalStyles.label}>{field.label}</Text>}
          <View style={globalStyles.pickerWrapper}>
            <Picker
              selectedValue={value}
              onValueChange={(val) => updateValue(field.name, val)}
              style={globalStyles.picker}
            >
              <Picker.Item 
                label={field.placeholder || 'Selecciona una opción'} 
                value="" 
              />
              {field.pickerOptions?.map((option) => (
                <Picker.Item 
                  key={option.value} 
                  label={option.label} 
                  value={option.value} 
                />
              ))}
            </Picker>
          </View>
          {error && <Text style={globalStyles.errorText}>{error}</Text>}
        </View>
      );
    }

    // TIPO: DATE (selector de fecha)
    if (field.type === 'date') {
      if (Platform.OS === 'web') {
        return (
          <View key={field.name}>
            {field.label && <Text style={globalStyles.label}>{field.label}</Text>}
            <input
              type="date"
              style={{
                ...globalStyles.dateInput,
                color: value ? '#000' : '#999'
              }}
              value={value}
              onChange={(e: any) => updateValue(field.name, e.target.value)}
              placeholder={field.placeholder}
            />
            {error && <Text style={globalStyles.errorText}>{error}</Text>}
          </View>
        );
      } else {
        // Móvil - DateTimePicker nativo
        return (
          <View key={field.name}>
            {field.label && <Text style={globalStyles.label}>{field.label}</Text>}
            <TouchableOpacity
              style={globalStyles.input}
              onPress={() => {
                setShowDatePicker(prev => ({ ...prev, [field.name]: true }));
                if (!tempDates[field.name]) {
                  setTempDates(prev => ({ ...prev, [field.name]: new Date() }));
                }
              }}
            >
              <Text style={{ color: value ? '#1e293b' : '#999' }}>
                {value || field.placeholder || 'Selecciona una fecha'}
              </Text>
            </TouchableOpacity>
            {showDatePicker[field.name] && (
              <DateTimePicker
                value={tempDates[field.name] || new Date()}
                mode="date"
                display="default"
                onChange={(_, selectedDate) => {
                  setShowDatePicker(prev => ({ ...prev, [field.name]: false }));
                  if (selectedDate) {
                    setTempDates(prev => ({ ...prev, [field.name]: selectedDate }));
                    const formatted = selectedDate.toISOString().split('T')[0];
                    updateValue(field.name, formatted);
                  }
                }}
                maximumDate={new Date()}
              />
            )}
            {error && <Text style={globalStyles.errorText}>{error}</Text>}
          </View>
        );
      }
    }

    // TIPO: TEXTAREA (área de texto multilínea)
    if (field.type === 'textarea') {
      return (
        <View key={field.name}>
          {field.label && <Text style={globalStyles.label}>{field.label}</Text>}
          <TextInput
            placeholder={field.placeholder}
            value={value}
            onChangeText={(val) => updateValue(field.name, val)}
            style={[globalStyles.input, { height: 80, textAlignVertical: 'top' }]}
            placeholderTextColor="#999"
            multiline
          />
          {error && <Text style={globalStyles.errorText}>{error}</Text>}
        </View>
      );
    }

    // TIPOS: TEXT, EMAIL, PASSWORD, NUMBER, PHONE (inputs estándar)
   return (
      <View key={field.name} style={{ width: '100%' }}>
        {field.label && <Text style={globalStyles.label}>{field.label}</Text>}
        <TextInput
          placeholder={field.placeholder}
          value={value}
          onChangeText={(val) => updateValue(field.name, val)}
          style={[globalStyles.input, { width: '100%' }]}
          placeholderTextColor="#999"
          keyboardType={
            field.type === 'number' ? 'numeric' :
            field.type === 'phone' ? 'phone-pad' :
            field.type === 'email' ? 'email-address' :
            'default'
          }
          autoCapitalize={
            field.type === 'email' ? 'none' :
            field.autoCapitalize || 'sentences'
          }
          secureTextEntry={field.type === 'password'}
        />
        {error && <Text style={globalStyles.errorText}>{error}</Text>}
      </View>
    );
  };

  // ============================================
  // RENDER PRINCIPAL
  // ============================================
  
  return (
    <View style={globalStyles.formBox}>
      {/* Título y subtítulo */}
      {title && <Text style={globalStyles.title}>{title}</Text>}
      {subtitle && <Text style={globalStyles.subtitle}>{subtitle}</Text>}

      {/* Error general */}
      {generalError ? (
        <Text style={globalStyles.errorText}>{generalError}</Text>
      ) : null}

      {/* Renderizar todos los campos */}
      {fields.map(field => renderField(field))}

      {/* Botón de submit */}
      <TouchableOpacity
        style={[globalStyles.button, isSubmitting && globalStyles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={globalStyles.buttonText}>{submitButtonText}</Text>
        )}
      </TouchableOpacity>

      {/* Botón de cancelar (opcional) */}
      {showCancelButton && onCancel && (
        <TouchableOpacity onPress={onCancel}>
          <Text style={globalStyles.link}>{cancelButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}