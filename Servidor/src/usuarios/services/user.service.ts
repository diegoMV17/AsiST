import { UserRepository } from "../interfaces/user.repository";
import { CreateUsertDto, LoginResponse, loginUserDto, UpdateUserDto } from "../interfaces/user.dto";

export class UserService {
  constructor(private userRepository: UserRepository) { }

  async createUser(data: CreateUsertDto): Promise<CreateUsertDto> {
    try {
      // Validar si el correo ya está registrado
      const existingUser = await this.userRepository.findUserByEmail(data.correo);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Validación del rol
      const allowedRoles = ['pasajero', 'conductor', 'ambos'];

      // Si alguien intenta crear un admin, lanzar error
      if (data.rol && data.rol === 'admin') {
        throw new Error('No está permitido crear usuarios con rol admin');
      }

      // Validar que el rol enviado esté permitido (opcional pero recomendado)
      if (data.rol && !allowedRoles.includes(data.rol)) {
        throw new Error(`Rol inválido. Solo se permiten: ${allowedRoles.join(', ')}`);
      }

      // Si no se especifica rol, establecer uno por defecto
      const safeData = {
        ...data,
        rol: data.rol ?? 'pasajero', // Asigna 'pasajero' como rol por defecto
      };

      // Crear el usuario
      return this.userRepository.createUser(safeData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Vuelves a lanzar el error para que sea manejado por el controlador o middleware
    }
  }

  loginUser(data: loginUserDto): Promise<LoginResponse> {
    return this.userRepository.loginUser(data);
  }

  async getAllUsers(): Promise<CreateUsertDto[]> {
    try {
      console.log('Calling getAllUsers from service');
      const users = await this.userRepository.getAllUsers();
      console.log('Users returned from repository:', JSON.stringify(users, null, 2));
      return users;
    } catch (error) {
      console.error('Error in getAllUsers service:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<CreateUsertDto | null> {
    return this.userRepository.getById(id);
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<CreateUsertDto | null> {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }

  async findUserByEmail(email: string): Promise<CreateUsertDto | null> {
    return this.userRepository.findUserByEmail(email);
  }
  async addVehicleToUser(userId: string, vehicleId: string): Promise<CreateUsertDto | null> {
    return this.userRepository.addVehicleToUser(userId, vehicleId);
  }
  async removeVehicleFromUser(userId: string, vehicleId: string): Promise<CreateUsertDto | null> {
    return this.userRepository.removeVehicleFromUser(userId, vehicleId);
  }
  async getUserVehicles(userId: string): Promise<CreateUsertDto | null> {
    return this.userRepository.getUserVehicles(userId);
  }

}