// src/screens/driver/RegisterVehicleScreen.tsx (NUEVA VERSIÓN)

import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { DynamicScreen } from '../../components/dynamic';
import { ScreenConfig } from '../../components/dynamic/types';
import { getVehicleFormFields } from '../../config/vehicleFormConfig';
import { createVehicle } from '../../api/VehicleApi';
import { relateVehicleToUser } from '../../api/UserApi';
import { obtenerToken, obtenerUsuarioDesdeToken } from '../../auth/authService';

export default function RegisterVehicleScreen({ navigation }: any) {
  
  // ============================================
  // ESTADOS
  // ============================================
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // ============================================
  // CARGAR DATOS INICIALES
  // ============================================
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const token = await obtenerToken();
        const user = await obtenerUsuarioDesdeToken();

        if (!token || !user?.id) {
          setError('No se encontró el token o el usuario');
          Alert.alert('Error', 'Sesión no válida. Por favor inicia sesión nuevamente.');
          navigation.goBack();
          return;
        }

        setUserId(user.id);
      } catch (err: any) {
        console.error('Error al cargar datos del usuario:', err);
        setError('Error al cargar información del usuario');
        Alert.alert('Error', 'No se pudo cargar la información del usuario');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigation]);

  // ============================================
  // HANDLERS
  // ============================================
  
  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      // 1. Crear el vehículo en la base de datos
      const newVehicle = await createVehicle(
        values.placa,
        values.marca,
        values.numeroSerie,
        values.soat,
        values.modelo,
        values.tipo,
        values.color,
        Number(values.capacidad)
      );

      const vehicleId = newVehicle._id;

      // 2. Relacionar el vehículo con el usuario autenticado
      const token = await obtenerToken();
      if (!token) {
        throw new Error('Token no encontrado');
      }

      await relateVehicleToUser(userId, vehicleId, token);

      // 3. Mostrar mensaje de éxito
     navigation.navigate('ListarVehiculos');
      
      // 4. Mostrar mensaje de éxito (después de navegar)
      setTimeout(() => {
        Alert.alert(
          'Éxito', 
          `Vehículo ${values.placa} registrado y asociado correctamente`
        );
      }, 300);

    } catch (err: any) {
      console.error('Error al registrar vehículo:', err);
      // El error será mostrado por el GenericForm
      throw new Error(err.message || 'Error al registrar o asociar el vehículo');
    }
  };

  /**
   * Maneja el botón de cancelar/volver
   */
  const handleCancel = () => {
    navigation.goBack();
  };

  // ============================================
  // CONFIGURACIÓN DE LA PANTALLA
  // ============================================
  
  const screenConfig: ScreenConfig = {
    // Loading general mientras carga los datos del usuario
    loading: loading,
    loadingMessage: 'Cargando información...',
    
    // Secciones de la pantalla
    sections: [
      {
        id: 'vehicle-form',
        type: 'form',
        title: 'Registro de Vehículo',
        fields: getVehicleFormFields(),
        onSubmit: handleSubmit,
        submitButtonText: 'Registrar Vehículo',
        showCancelButton: true,
        onCancel: handleCancel,
        cancelButtonText: 'Volver',
      },
    ],
  };

  // ============================================
  // RENDER
  // ============================================
  
  return <DynamicScreen config={screenConfig} />;
}

// ============================================
// NOTAS DE USO
// ============================================
/*
  COMPARACIÓN: Antes vs Después
  
  ANTES (RegisterVehicleScreen.tsx original):
  - 150+ líneas de código
  - 9 estados individuales (useState para cada campo)
  - Lógica de validación mezclada con UI
  - JSX extenso con todos los inputs
  - Difícil de mantener y reutilizar
  
  DESPUÉS (esta versión):
  - ~120 líneas (incluyendo comentarios)
  - 3 estados simples (userId, loading, error)
  - Lógica de negocio separada de UI
  - Configuración declarativa
  - Fácil de mantener y reutilizar
  
  VENTAJAS:
  ✅ Más limpio y legible
  ✅ Validaciones automáticas
  ✅ Configuración reutilizable
  ✅ Manejo de errores consistente
  ✅ Loading states integrados
  ✅ Fácil de testear
  ✅ Escalable para agregar más campos
  
  CÓMO USAR EN OTRAS PANTALLAS:
  1. Crear configuración de campos
  2. Definir handler de submit
  3. Crear ScreenConfig
  4. Return <DynamicScreen config={screenConfig} />
*/