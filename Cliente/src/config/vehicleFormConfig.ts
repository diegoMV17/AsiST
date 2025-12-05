// src/configs/vehicleFormConfig.ts

import { FieldConfig } from '../components/dynamic/types';
import { 
  validarPlacaColombia, 
  validarCapacidadVehiculo 
} from '../utils/validator';

/**
 * Configuración de campos para el formulario de registro de vehículo
 * Esta configuración es reutilizable y puede usarse en crear y editar
 */
export const getVehicleFormFields = (): FieldConfig[] => [
  {
    name: 'placa',
    type: 'text',
    placeholder: 'Placa (ej: ABC123 o ABC12D)',
    required: true,
    validation: validarPlacaColombia,
    autoCapitalize: 'characters', // Fuerza mayúsculas mientras escribe
  },
  {
    name: 'marca',
    type: 'text',
    placeholder: 'Marca',
    required: true,
    minLength: 2,
    maxLength: 50,
    validation: (value: string) => {
      if (!value) return null;
      if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(value)) {
        return 'La marca solo debe contener letras';
      }
      return null;
    }
  },
  {
    name: 'numeroSerie',
    type: 'text',
    placeholder: 'Número de Serie',
    required: true,
    minLength: 5,
    maxLength: 30,
  },
  {
    name: 'soat',
    type: 'text',
    placeholder: 'SOAT',
    required: true,
    validation: (value: string) => {
      if (!value) return null;
      if (value.length < 5) {
        return 'El SOAT debe tener al menos 5 caracteres';
      }
      return null;
    }
  },
  {
    name: 'modelo',
    type: 'text',
    placeholder: 'Modelo (ej: 2020, 2021)',
    required: true,
    validation: (value: string) => {
      if (!value) return null;
      
      // Permitir texto o año
      const esAño = /^\d{4}$/.test(value);
      if (esAño) {
        const año = Number(value);
        const añoActual = new Date().getFullYear();
        if (año < 1900 || año > añoActual + 1) {
          return `El año debe estar entre 1900 y ${añoActual + 1}`;
        }
      }
      return null;
    }
  },
  {
    name: 'tipo',
    label: 'Tipo de vehículo',
    type: 'multiselect',
    required: true,
    defaultValue: 'carro',
    pickerOptions: [
      { label: 'Carro', value: 'carro' },
      { label: 'SUV', value: 'SUV' },
      { label: 'Camioneta', value: 'camioneta' },
      { label: 'Sedan', value: 'sedan' },
    ],
  },
  {
    name: 'color',
    type: 'text',
    placeholder: 'Color',
    required: true,
    minLength: 3,
    maxLength: 20,
    validation: (value: string) => {
      if (!value) return null;
      if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(value)) {
        return 'El color solo debe contener letras';
      }
      return null;
    }
  },
  {
    name: 'capacidad',
    type: 'number',
    placeholder: 'Capacidad (número de pasajeros)',
    required: true,
    min: 1,
    max: 20,
    validation: validarCapacidadVehiculo,
  },
];

/**
 * Función helper para obtener valores iniciales
 */
export const getVehicleInitialValues = (vehicleData?: any) => {
  if (!vehicleData) {
    return {
      tipo: 'carro', // Valor por defecto
    };
  }

  return {
    placa: vehicleData.placa || '',
    marca: vehicleData.marca || '',
    numeroSerie: vehicleData.numeroSerie || '',
    soat: vehicleData.soat || '',
    modelo: vehicleData.modelo || '',
    tipo: vehicleData.tipo || 'carro',
    color: vehicleData.color || '',
    capacidad: vehicleData.capacidad?.toString() || '',
  };
};