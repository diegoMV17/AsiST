import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  id: string;
  nombre: string;
  rol: string;
  // Agrega aquí otros campos que incluya tu token
};

export const guardarToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error al guardar el token', error);
  }
};

export const obtenerToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error al obtener el token', error);
    return null;
  }
};

export const cerrarSesion = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error al cerrar sesión', error);
  }
};
export const obtenerUsuarioDesdeToken = async (): Promise<JwtPayload | null> => {
  try {
    const token = await obtenerToken();
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded;
    }
    return null;
  } catch (error) {
    console.error('Error al decodificar el token', error);
    return null;
  }
};