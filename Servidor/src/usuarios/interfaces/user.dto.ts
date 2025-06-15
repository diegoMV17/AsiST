export interface CreateUsertDto {
  nombre: string;
  correo: string;
  contraseña: string;
  rol?: 'conductor' | 'pasajero' | 'ambos' | 'admin';
}

export interface UpdateUserDto {
  nombre?: string;
  correo?: string;
  contraseña?: string;
  rol?: 'conductor' | 'pasajero' | 'ambos' | 'admin';
}

export interface loginUserDto {
  correo: string;
  contraseña: string;
}
