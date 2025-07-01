const API_BASE = process.env.PUBLIC_URL_API;

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

export async function registerUser(nombre: string, correo: string, contraseña: string, rol: string) {
  const response = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, contraseña, rol }),
  });
  if (!response.ok) {
    throw new Error('Error al registrar usuario');
  }
  return response.json();
}