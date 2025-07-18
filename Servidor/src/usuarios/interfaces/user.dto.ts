export interface CreateUsertDto {
  nombre: string;
  apellido: string;
  telefono: string;
  cedula: string;
  fechaNacimiento: string;
  ciudad: string;
  correo: string;
  contraseña: string;
  rol: 'conductor' | 'pasajero' | 'ambos' | 'admin';
  vehicles?: string[];
}

export interface UpdateUserDto {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  cedula?: string;
  fechaNacimiento?: string;
  ciudad?: string;
  correo?: string;
  contraseña?: string;
  rol?: 'conductor' | 'pasajero' | 'ambos' | 'admin';
  vehicles?: string[];
}

export interface loginUserDto {
  correo: string;
  contraseña: string;
}
export interface LoginResponse {
  user: {
    id: string;
    correo: string;
    rol: string;
    vehiculos?: string[];
  };
  token: string;
}
