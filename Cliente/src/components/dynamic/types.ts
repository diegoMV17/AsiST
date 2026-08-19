import { JSX } from 'react';

// ============================================
// TIPOS DE CAMPOS DISPONIBLES
// ============================================
export type FieldType = 
  | 'text'           // Input de texto normal
  | 'email'          // Input de email
  | 'password'       // Input de contraseña
  | 'number'         // Input numérico
  | 'phone'          // Input de teléfono
  | 'date'           // Selector de fecha
  | 'textarea'       // Área de texto multilínea
  | 'picker'         // Dropdown/Select
  | 'multiselect';   // Botones de selección única (como tu selector de tipo)

// ============================================
// CONFIGURACIÓN DE CAMPOS DEL FORMULARIO
// ============================================
export interface FieldConfig {
  // Identificación
  name: string;                              // Nombre único del campo (key del objeto)
  label?: string;                            // Label arriba del campo (opcional)
  placeholder?: string;                      // Placeholder del input
  
  // Tipo y comportamiento
  type: FieldType;                           // Tipo de campo
  required?: boolean;                        // Si es obligatorio
  defaultValue?: any;                        // Valor por defecto
  
  // Validación
  validation?: (value: any) => string | null; // Función personalizada que retorna error o null
  minLength?: number;                        // Longitud mínima (para text)
  maxLength?: number;                        // Longitud máxima (para text)
  min?: number;                              // Valor mínimo (para number)
  max?: number;                              // Valor máximo (para number)
  
  // Opciones para picker y multiselect
  pickerOptions?: { label: string; value: any }[];
  
  // Configuración adicional
  multiline?: boolean;                       // Para textarea
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'; // Tipo de teclado
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;                 // Para passwords
}

// ============================================
// TIPOS DE SECCIONES DISPONIBLES
// ============================================
export type SectionType = 
  | 'form'           // Formulario
  | 'cardList'       // Lista de cards
  | 'cardGrid'       // Grid de cards
  | 'banner'         // Banner informativo
  | 'list'           // Lista simple
  | 'filter'         // Sección de filtros
  | 'map'            // Mapa
  | 'stats'          // Estadísticas
  | 'tabs'           // Pestañas
  | 'header';        // Header personalizado

// ============================================
// CONFIGURACIÓN BASE DE SECCIONES
// ============================================
export interface BaseSection {
  id: string;                    // Identificador único de la sección
  type: SectionType;             // Tipo de sección
  visible?: boolean;             // Si se debe mostrar (default: true)
  style?: any;                   // Estilos personalizados
  padding?: boolean;             // Si tiene padding (default: true)
  backgroundColor?: string;      // Color de fondo
}

// ============================================
// CONFIGURACIÓN ESPECÍFICA: FORM SECTION
// ============================================
export interface FormSectionConfig extends BaseSection {
  type: 'form';
  title?: string;                                    // Título del formulario
  subtitle?: string;                                 // Subtítulo
  fields: FieldConfig[];                             // Array de campos
  onSubmit: (values: Record<string, any>) => Promise<void>; // Callback al enviar
  submitButtonText?: string;                         // Texto del botón (default: 'Enviar')
  showCancelButton?: boolean;                        // Mostrar botón cancelar
  onCancel?: () => void;                             // Callback al cancelar
  cancelButtonText?: string;                         // Texto botón cancelar
  initialValues?: Record<string, any>;               // Valores iniciales del form
}

// ============================================
// CONFIGURACIÓN ESPECÍFICA: CARD LIST SECTION
// ============================================
export interface CardListSectionConfig extends BaseSection {
  type: 'cardList';
  title?: string;                                    // Título de la sección
  data: any[];                                       // Array de datos
  renderCard: (item: any, index: number) => JSX.Element; // Función para renderizar cada card
  onCardPress?: (item: any) => void;                 // Callback al presionar card
  horizontal?: boolean;                              // Lista horizontal o vertical
  loading?: boolean;                                 // Estado de carga
  emptyMessage?: string;                             // Mensaje cuando no hay datos
  onRefresh?: () => Promise<void>;                   // Pull to refresh
}

// ============================================
// CONFIGURACIÓN ESPECÍFICA: BANNER SECTION
// ============================================
export interface BannerSectionConfig extends BaseSection {
  type: 'banner';
  title: string;                                     // Título principal
  subtitle?: string;                                 // Subtítulo
  image?: any;                                       // Imagen (require o URL)
  icon?: string;                                     // Nombre del ícono (lucide-react)
  onPress?: () => void;                              // Callback al presionar
  variant?: 'primary' | 'secondary' | 'success' | 'danger'; // Estilo del banner
}

// ============================================
// UNION DE TODAS LAS CONFIGURACIONES
// ============================================
export type SectionConfig = 
  | FormSectionConfig 
  | CardListSectionConfig 
  | BannerSectionConfig;
  // Agregar más cuando implementes más secciones

// ============================================
// CONFIGURACIÓN COMPLETA DE UNA PANTALLA
// ============================================
export interface ScreenConfig {
  sections: SectionConfig[];                         // Array de secciones
  
  // Header (opcional)
  header?: {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
  };
  
  // Comportamiento de scroll
  scrollable?: boolean;                              // Si toda la pantalla es scrollable (default: false)
  
  // Pull to refresh
  refreshable?: boolean;                             // Si permite refresh
  onRefresh?: () => Promise<void>;                   // Callback del refresh
  
  // Loading
  loading?: boolean;                                 // Loading general de la pantalla
  loadingMessage?: string;                           // Mensaje durante loading
  
  // Background
  backgroundColor?: string;                          // Color de fondo de la pantalla
}

// ============================================
// RESULTADO DE VALIDACIÓN
// ============================================
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;                    // { fieldName: errorMessage }
}

// ============================================
// PROPS PARA COMPONENTES DE SECCIÓN
// ============================================
export interface SectionProps {
  config: SectionConfig;
  // Agregar más props comunes si es necesario
}