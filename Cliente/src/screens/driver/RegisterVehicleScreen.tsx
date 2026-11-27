import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { DynamicScreen } from '../../components/dynamic';
import { ScreenConfig } from '../../components/dynamic/types';
import { getVehicleFormFields } from '../../config/vehicleFormConfig';
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
  // CARGAR DATOS INICIALES (usuario autenticado)
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
   * Se ejecuta DESPUÉS de que GenericForm crea el vehículo
   * (POST automático a apiPath="vehicles" vía apiService.create).
   * "newVehicle" es el resultado que devuelve el backend, incluyendo _id.
   */
  const handleAfterSubmit = async (newVehicle: any, values: Record<string, any>) => {
    try {
      // Relacionar el vehículo recién creado con el usuario autenticado
      await relateVehicleToUser(userId, newVehicle._id);

      // Navegar a la lista
      navigation.navigate('ListarVehiculos');

      // Mostrar mensaje de éxito (después de navegar)
      setTimeout(() => {
        Alert.alert(
          'Éxito',
          `Vehículo ${values.placa} registrado y asociado correctamente`
        );
      }, 300);
    } catch (err: any) {
      console.error('Error al asociar vehículo:', err);
      // Este throw lo captura GenericForm y lo muestra como generalError
      throw new Error(err.message || 'El vehículo se creó, pero no se pudo asociar al usuario');
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
    loading: loading,
    loadingMessage: 'Cargando información...',

    sections: [
      {
        id: 'vehicle-form',
        type: 'form',
        title: 'Registro de Vehículo',
        fields: getVehicleFormFields(),
        apiPath: 'vehicles',            // GenericForm hace el POST automático
        afterSubmit: handleAfterSubmit, // lógica de negocio post-creación
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