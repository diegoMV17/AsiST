import apiService from './../services/apiService';

export async function loginUser(correo: string, contraseña: string) {
  return apiService.post('users/login', { correo, contraseña }, { auth: false });
}

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
  return apiService.post('users/register', {
    nombre, apellido, telefono, cedula, fechaNacimiento, ciudad, correo, contraseña, rol,
  }, { auth: false });
}

export async function getUserData(userId: string, token?: string) {
  // CAMBIO: ya no atrapa el error y devuelve null — ahora propaga (decisión 1)
  return apiService.get(`users/${userId}`);
}

export async function updateUser(
  id: string,
  updates: Partial<{ nombre: string; telefono: string; ciudad: string; password: string }>
) {
  return apiService.put(`users/${id}`, updates);
}

export async function relateVehicleToUser(userId: string, vehicleId: string, token?: string) {
  return apiService.post(`users/${userId}/vehicles/${vehicleId}`);
}

export async function getUserVehicles(userId: string, token?: string) {
  return apiService.get(`users/${userId}/vehicles`);
}

export async function removeVehicleFromUser(userId: string, vehicleId: string, token?: string) {
  return apiService.del(`users/${userId}/vehicles/${vehicleId}`);
}

export async function getUserHistory(userId: string) {
  return apiService.get(`users/${userId}/history`);
}

export async function getUserRoutes(userId: string) {
  return apiService.get(`users/${userId}/routes`);
}

export async function createRoute(userId: string, origen: string, destino: string, hora: string, cupos: number) {
  return apiService.post(`users/${userId}/routes`, { origen, destino, hora, cupos });
}

export async function deleteRoute(routeId: string) {
  return apiService.del(`routes/${routeId}`);
}

export async function searchRoutes(filters: { destino?: string; hora?: string; conductor?: string }) {
  return apiService.get('routes', { params: filters });
}

export async function joinRoute(userId: string, routeId: string) {
  return apiService.post(`routes/${routeId}/join`, { userId });
}

export async function getAllUsers() {
  return apiService.get('admin/users');
}

export async function deleteUser(id: string) {
  return apiService.del(`admin/users/${id}`);
}

export async function changeUserRole(id: string, nuevoRol: string) {
  return apiService.put(`admin/users/${id}/role`, { rol: nuevoRol });
}