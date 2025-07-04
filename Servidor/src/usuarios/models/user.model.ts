import {Schema, model} from 'mongoose';
import { CreateUsertDto } from '../interfaces/user.dto';

const userSchema = new Schema<CreateUsertDto>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  fechaNacimiento: { type: String, required: true },
  ciudad: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['conductor', 'pasajero', 'ambos', 'admin'], default: 'pasajero' },
  vehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }] 
}, {
  timestamps: true
});

export const UserModel = model<CreateUsertDto>('User', userSchema);