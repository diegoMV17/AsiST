import { CreateUsertDto, loginUserDto, UpdateUserDto } from './user.dto';

export interface UserRepository {
  createUser: (data: CreateUsertDto) => Promise<CreateUsertDto>;
  loginUser: (data: loginUserDto) => Promise<CreateUsertDto>;
  getAllUsers: () => Promise<CreateUsertDto[]>;
  getById: (id: string) => Promise<CreateUsertDto | null>;
  updateUser: (id: string, data: UpdateUserDto) => Promise<CreateUsertDto | null>;
  deleteUser: (id: string) => Promise<void>;
  findUserByEmail: (email: string) => Promise<CreateUsertDto | null>;
  addVehicleToUser: (userId: string, vehicleId: string) => Promise<CreateUsertDto | null>;
  removeVehicleFromUser: (userId: string, vehicleId: string) => Promise<CreateUsertDto | null>;
  getUserVehicles: (userId: string) => Promise<CreateUsertDto | null>;
}