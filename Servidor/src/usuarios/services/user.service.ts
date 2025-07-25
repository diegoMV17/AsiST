import { UserRepository } from "../interfaces/user.repository";
import { CreateUsertDto,LoginResponse,loginUserDto,UpdateUserDto } from "../interfaces/user.dto";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUsertDto): Promise<CreateUsertDto> {
    return this.userRepository.createUser(data);
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