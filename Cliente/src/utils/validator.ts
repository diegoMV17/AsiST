// src/utils/validators.ts

/**
 * Funciones de validación reutilizables para formularios
 * Todas retornan: string (mensaje de error) o null (válido)
 */

// ============================================
// VALIDADOR DE PLACAS DE COLOMBIA
// ============================================

/**
 * Valida placas de vehículos en Colombia
 * 
 * Formatos válidos:
 * - ABC123: 3 letras + 3 números (vehículos particulares antiguos)
 * - ABC12D: 3 letras + 2 números + 1 letra (vehículos particulares nuevos desde 2001)
 * - ABC123: Motos (3 letras + 3 números)
 * - T12345: Taxis (T + 5 números)
 * - S12345: Servicio público (S + 5 números)
 * 
 * @param placa - Placa a validar
 * @returns null si es válida, mensaje de error si no lo es
 */
export const validarPlacaColombia = (placa: string): string | null => {
  // Limpiar espacios y convertir a mayúsculas
  const placaLimpia = placa.trim().toUpperCase().replace(/\s+/g, '');

  // Validar que no esté vacía
  if (!placaLimpia) {
    return 'La placa es obligatoria';
  }

  // Validar longitud (debe ser 6 caracteres)
  if (placaLimpia.length !== 6) {
    return 'La placa debe tener 6 caracteres';
  }

  // Expresiones regulares para diferentes formatos
  const formatoParticular = /^[A-Z]{3}\d{3}$/;           // ABC123
  const formatoParticularNuevo = /^[A-Z]{3}\d{2}[A-Z]$/; // ABC12D
  const formatoMoto = /^[A-Z]{3}\d{3}$/;                 // ABC123 (igual que particular)
  const formatoTaxi = /^T\d{5}$/;                        // T12345
  const formatoPublico = /^[SP]\d{5}$/;                  // S12345 o P12345

  // Verificar si coincide con algún formato válido
  const esValida = 
    formatoParticular.test(placaLimpia) ||
    formatoParticularNuevo.test(placaLimpia) ||
    formatoMoto.test(placaLimpia) ||
    formatoTaxi.test(placaLimpia) ||
    formatoPublico.test(placaLimpia);

  if (!esValida) {
    return 'Formato de placa inválido. Ejemplos válidos: ABC123, ABC12D, T12345';
  }

  return null; // Válida
};

// ============================================
// VALIDADOR DE EMAIL INSTITUCIONAL
// ============================================

/**
 * Valida que el email sea de dominios institucionales específicos
 * 
 * @param email - Email a validar
 * @param dominios - Array de dominios permitidos
 * @returns null si es válido, mensaje de error si no lo es
 */
export const validarEmailInstitucional = (
  email: string,
  dominios: string[] = ['usantoto.edu.co', 'ustatunjaedu.co']
): string | null => {
  const emailLimpio = email.trim().toLowerCase();

  if (!emailLimpio) {
    return 'El correo electrónico es obligatorio';
  }

  // Validar formato básico de email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(emailLimpio)) {
    return 'Formato de correo electrónico inválido';
  }

  // Verificar que sea de un dominio institucional
  const esInstitucional = dominios.some(dominio => 
    emailLimpio.endsWith(`@${dominio}`)
  );

  if (!esInstitucional) {
    return `El correo debe ser de dominio ${dominios.join(' o ')}`;
  }

  return null; // Válido
};

// ============================================
// VALIDADOR DE CONTRASEÑA
// ============================================

/**
 * Valida que la contraseña cumpla con requisitos mínimos
 * 
 * @param password - Contraseña a validar
 * @param minLength - Longitud mínima (default: 8)
 * @returns null si es válida, mensaje de error si no lo es
 */
export const validarPassword = (password: string, minLength: number = 8): string | null => {
  if (!password) {
    return 'La contraseña es obligatoria';
  }

  if (password.length < minLength) {
    return `La contraseña debe tener al menos ${minLength} caracteres`;
  }

  // Verificar que tenga al menos una letra
  if (!/[a-zA-Z]/.test(password)) {
    return 'La contraseña debe contener al menos una letra';
  }

  // Verificar que tenga al menos un número
  if (!/\d/.test(password)) {
    return 'La contraseña debe contener al menos un número';
  }

  return null; // Válida
};

// ============================================
// VALIDADOR DE CÉDULA COLOMBIANA
// ============================================

/**
 * Valida que la cédula sea un número válido
 * 
 * @param cedula - Cédula a validar
 * @returns null si es válida, mensaje de error si no lo es
 */
export const validarCedulaColombia = (cedula: string): string | null => {
  const cedulaLimpia = cedula.trim();

  if (!cedulaLimpia) {
    return 'La cédula es obligatoria';
  }

  // Validar que solo contenga números
  if (!/^\d+$/.test(cedulaLimpia)) {
    return 'La cédula solo debe contener números';
  }

  // Validar longitud (cédulas colombianas: 6-10 dígitos)
  if (cedulaLimpia.length < 6 || cedulaLimpia.length > 10) {
    return 'La cédula debe tener entre 6 y 10 dígitos';
  }

  return null; // Válida
};

// ============================================
// VALIDADOR DE TELÉFONO COLOMBIANO
// ============================================

/**
 * Valida números de teléfono colombianos
 * 
 * @param telefono - Teléfono a validar
 * @returns null si es válido, mensaje de error si no lo es
 */
export const validarTelefonoColombia = (telefono: string): string | null => {
  // Limpiar espacios, guiones y paréntesis
  const telefonoLimpio = telefono.trim().replace(/[\s\-\(\)]/g, '');

  if (!telefonoLimpio) {
    return 'El teléfono es obligatorio';
  }

  // Validar que solo contenga números (y opcionalmente + al inicio)
  if (!/^\+?\d+$/.test(telefonoLimpio)) {
    return 'El teléfono solo debe contener números';
  }

  // Remover + para validar longitud
  const soloNumeros = telefonoLimpio.replace(/^\+/, '');

  // Teléfonos en Colombia:
  // - Celulares: 10 dígitos (3XX XXX XXXX)
  // - Fijos: 7 dígitos (XXX XXXX) o 10 con indicativo (60X XXX XXXX)
  if (soloNumeros.length !== 7 && soloNumeros.length !== 10) {
    return 'El teléfono debe tener 7 o 10 dígitos';
  }

  // Si tiene 10 dígitos, debe empezar con 3 (celular) o 60X (fijo con indicativo)
  if (soloNumeros.length === 10) {
    if (!soloNumeros.startsWith('3') && !soloNumeros.startsWith('60')) {
      return 'Número de teléfono inválido';
    }
  }

  return null; // Válido
};

// ============================================
// VALIDADOR DE CAPACIDAD DE VEHÍCULO
// ============================================

/**
 * Valida la capacidad de pasajeros de un vehículo
 * 
 * @param capacidad - Capacidad a validar (string o number)
 * @returns null si es válida, mensaje de error si no lo es
 */
export const validarCapacidadVehiculo = (capacidad: string | number): string | null => {
  const capacidadNum = typeof capacidad === 'string' ? Number(capacidad) : capacidad;

  if (isNaN(capacidadNum)) {
    return 'La capacidad debe ser un número válido';
  }

  if (capacidadNum <= 0) {
    return 'La capacidad debe ser un número positivo';
  }

  if (capacidadNum > 50) {
    return 'La capacidad no puede ser mayor a 50 pasajeros';
  }

  if (!Number.isInteger(capacidadNum)) {
    return 'La capacidad debe ser un número entero';
  }

  return null; // Válida
};

// ============================================
// VALIDADOR DE FECHA DE NACIMIENTO
// ============================================

/**
 * Valida que la persona sea mayor de edad
 * 
 * @param fechaNacimiento - Fecha en formato YYYY-MM-DD
 * @param edadMinima - Edad mínima requerida (default: 18)
 * @returns null si es válida, mensaje de error si no lo es
 */
export const validarEdadMinima = (
  fechaNacimiento: string, 
  edadMinima: number = 18
): string | null => {
  if (!fechaNacimiento) {
    return 'La fecha de nacimiento es obligatoria';
  }

  const fecha = new Date(fechaNacimiento);
  const hoy = new Date();

  // Validar que sea una fecha válida
  if (isNaN(fecha.getTime())) {
    return 'Fecha de nacimiento inválida';
  }

  // Calcular edad
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const mes = hoy.getMonth() - fecha.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
    edad--;
  }

  if (edad < edadMinima) {
    return `Debes tener al menos ${edadMinima} años`;
  }

  if (edad > 120) {
    return 'Fecha de nacimiento inválida';
  }

  return null; // Válida
};

// ============================================
// VALIDADOR DE FORMATO DE HORA
// ============================================

/**
 * Valida formato de hora HH:MM
 * 
 * @param hora - Hora en formato HH:MM
 * @returns null si es válida, mensaje de error si no lo es
 */
export const validarFormatoHora = (hora: string): string | null => {
  if (!hora) {
    return 'La hora es obligatoria';
  }

  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
  if (!regex.test(hora)) {
    return 'Formato de hora inválido. Use HH:MM (ejemplo: 14:30)';
  }

  return null; // Válida
};

// ============================================
// HELPER: COMBINAR VALIDADORES
// ============================================

/**
 * Combina múltiples validadores en uno solo
 * Se detiene en el primer error encontrado
 * 
 * @param validators - Array de funciones validadoras
 * @returns Función validadora combinada
 */
export const combinarValidadores = (
  ...validators: Array<(value: any) => string | null>
) => {
  return (value: any): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
};