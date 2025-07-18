import jwt, { SignOptions } from 'jsonwebtoken';
import { Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  _id: Types.ObjectId;
  correo: string;
  rol: string;
  nombre?: string;
  vehicles?: string[]; // Asegurarse de que vehicles sea un array
}

// Interfaz más flexible para el generateToken
interface IUserForToken {
  _id: Types.ObjectId;
  correo: string;
  rol: string;
  nombre?: string;
  vehicles?: string[]; // Asegurarse de que vehicles sea un array
}

interface TokenPayload {
  id: string;
  email: string;
  rol: string;
  vehicles?: string[]; // Opcional, si se desea incluir vehículos
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    rol: string;
    nombre?: string;
    vehicles: string[];
  };
  token: string;
}

export class AuthService {
  
  // Generar token JWT
  static generateToken(user: IUserForToken): string {
    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.correo,
      rol: user.rol || 'user', // Valor por defecto si rol es undefined
      vehicles: user.vehicles // Asegurarse de que vehicles sea un array
    };

    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }

    const options: SignOptions = {
      expiresIn: '1d', // 24 horas
      issuer: 'your-app-name', // Opcional: nombre de tu aplicación
      audience: 'your-app-users', // Opcional: audiencia del token
    };

    return jwt.sign(payload, secret, options);
  }

  // Verificar token
  static verifyToken(token: string): TokenPayload {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }

    try {
      const decoded = jwt.verify(token, secret) as TokenPayload;
      return decoded;
    } catch (error) {
      throw error; // Re-lanza el error para que sea manejado por el middleware
    }
  }

  // Validar contraseña
  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Hash de contraseña
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Crear respuesta de login
  static createLoginResponse(user: IUser): LoginResponse {
    const token = this.generateToken(user);
    
    return {
      user: {
        id: user._id.toString(),
        email: user.correo,
        rol: user.rol,
        nombre: user.nombre,
        vehicles: user.vehicles || []// Asegurarse de que vehicles sea un array
      },
      token
    };
  }
}

export const generateToken = (user: IUser): string => {
  return AuthService.generateToken(user);
};