import Constants from 'expo-constants';

const API_BASE = Constants.expoConfig?.extra?.PUBLIC_URL_API;


export async function loginUser(correo: string, contraseña: string) {
  const response = await fetch(`${API_BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contraseña }),
  });
  if (!response.ok) {
    throw new Error('Error al iniciar sesión');
  }
  return response.json();
}

export async function registerUser(nombre: string,
  apellido: string,
  telefono: string,
  cedula: string,
  fechaNacimiento: string,
  ciudad: string,
  correo: string,
  contraseña: string,
  rol: string) {
  const response = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre,
      apellido,
      telefono,
      cedula,
      fechaNacimiento,
      ciudad,
      correo,
      contraseña,
      rol,
    }),
  });
  if (!response.ok) {
    throw new Error('Error al registrar usuario');
  }
  return response.json();
}