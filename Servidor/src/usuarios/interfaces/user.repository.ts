import { CreateUsertDto, LoginResponse, loginUserDto, UpdateUserDto } from './user.dto';

export interface UserRepository {
  createUser: (data: CreateUsertDto) => Promise<CreateUsertDto>;
  loginUser: (data: loginUserDto) => Promise<LoginResponse>;
  getAllUsers: () => Promise<CreateUsertDto[]>;
  getById: (id: string) => Promise<CreateUsertDto | null>;
  updateUser: (id: string, data: UpdateUserDto) => Promise<CreateUsertDto | null>;
  deleteUser: (id: string) => Promise<void>;
  findUserByEmail: (email: string) => Promise<CreateUsertDto | null>;
  findUserByCedula: (cedula: string) => Promise<CreateUsertDto | null>;
  addVehicleToUser: (userId: string, vehicleId: string) => Promise<CreateUsertDto | null>;
  removeVehicleFromUser: (userId: string, vehicleId: string) => Promise<CreateUsertDto | null>;
  getUserVehicles: (userId: string) => Promise<CreateUsertDto | null>;
}