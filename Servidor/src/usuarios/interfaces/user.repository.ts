import { CreateUsertDto, loginUserDto, UpdateUserDto } from './user.dto';

export interface UserRepository {
  createUser: (data: CreateUsertDto) => Promise<CreateUsertDto>;
  loginUser: (data: loginUserDto) => Promise<CreateUsertDto>;
  getAllUsers: () => Promise<CreateUsertDto[]>;
  updateUser: (id: string, data: UpdateUserDto) => Promise<CreateUsertDto | null>;
  deleteUser: (id: string) => Promise<void>;
  findUserByEmail: (email: string) => Promise<CreateUsertDto | null>;
}