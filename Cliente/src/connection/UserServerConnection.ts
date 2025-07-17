import Constants from 'expo-constants';

const API_BASE = Constants.expoConfig?.extra?.PUBLIC_URL_API;

/**
 * Iniciar sesión de usuario
 */
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

/**
 * Registrar nuevo usuario
 */
export async function registerUser(
  nombre: string,
  apellido: string,
  telefono: string,
  cedula: string,
  fechaNacimiento: string,
  ciudad: string,
  correo: string,
  contraseña: string,
  rol: string
) {
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

/**
 * Actualizar datos de usuario
 */
export async function updateUser(
  id: string,
  updates: Partial<{
    nombre: string;
    telefono: string;
    ciudad: string;
    password: string;
  }>
) {
  const response = await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar usuario');
  }
  return response.json();
}

/**
 * Historial de viajes del usuario
 */
export async function getUserHistory(userId: string) {
  const response = await fetch(`${API_BASE}/api/users/${userId}/history`);
  if (!response.ok) {
    throw new Error('Error al obtener historial');
  }
  return response.json();
}

/**
 * Rutas creadas por el usuario
 */
export async function getUserRoutes(userId: string) {
  const response = await fetch(`${API_BASE}/api/users/${userId}/routes`);
  if (!response.ok) {
    throw new Error('Error al obtener rutas');
  }
  return response.json();
}

/**
 * Crear una nueva ruta
 */
export async function createRoute(
  userId: string,
  origen: string,
  destino: string,
  hora: string,
  cupos: number
) {
  const response = await fetch(`${API_BASE}/api/users/${userId}/routes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ origen, destino, hora, cupos }),
  });
  if (!response.ok) {
    throw new Error('Error al crear ruta');
  }
  return response.json();
}

/**
 * Eliminar una ruta
 */
export async function deleteRoute(routeId: string) {
  const response = await fetch(`${API_BASE}/api/routes/${routeId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar ruta');
  }
  return response.json();
}

/**
 * Buscar rutas disponibles con filtros opcionales
 */
export async function searchRoutes(filters: {
  destino?: string;
  hora?: string;
  conductor?: string;
}) {
  const params = new URLSearchParams(filters as any).toString();
  const response = await fetch(`${API_BASE}/api/routes?${params}`);
  if (!response.ok) {
    throw new Error('Error al buscar rutas');
  }
  return response.json();
}

/**
 * Unirse a una ruta
 */
export async function joinRoute(userId: string, routeId: string) {
  const response = await fetch(`${API_BASE}/api/routes/${routeId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
    throw new Error('Error al unirse a la ruta');
  }
  return response.json();
}

// ==============================
// ADMIN
// ==============================

/**
 * Obtener todos los usuarios (admin)
 */
export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/api/admin/users`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

/**
 * Eliminar usuario (admin)
 */
export async function deleteUser(id: string) {
  const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar usuario');
  return res.json();
}

/**
 * Cambiar rol de usuario (admin)
 */
export async function changeUserRole(id: string, nuevoRol: string) {
  const res = await fetch(`${API_BASE}/api/admin/users/${id}/role`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rol: nuevoRol }),
  });
  if (!res.ok) throw new Error('Error al cambiar rol de usuario');
  return res.json();
}

/**
 * Obtener todas las rutas activas (admin)
 */
export async function getAllRutas() {
  const res = await fetch(`${API_BASE}/api/admin/rutas`);
  if (!res.ok) throw new Error('Error al obtener rutas');
  return res.json();
}

/**
 * Cancelar ruta (admin)
 */
export async function cancelRuta(id: string) {
  const res = await fetch(`${API_BASE}/api/admin/rutas/${id}/cancel`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Error al cancelar ruta');
  return res.json();
}

/**
 * Obtener estadísticas para reportes (admin)
 */
export async function getReportes() {
  const res = await fetch(`${API_BASE}/api/admin/reportes`);
  if (!res.ok) throw new Error('Error al obtener reportes');
  return res.json();
}
