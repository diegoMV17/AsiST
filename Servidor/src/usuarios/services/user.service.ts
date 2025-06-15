import { UserRepository } from "../interfaces/user.repository";
import { CreateUsertDto,UpdateUserDto } from "../interfaces/user.dto";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUsertDto): Promise<CreateUsertDto> {
    return this.userRepository.createUser(data);
  }

  async getAllUsers(): Promise<CreateUsertDto[]> {
    return this.userRepository.getAllUsers();
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
}