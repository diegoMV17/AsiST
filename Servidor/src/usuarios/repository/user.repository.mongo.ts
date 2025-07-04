import { UserRepository } from "../interfaces/user.repository";
import { UserModel } from "../models/user.model";
import { CreateUsertDto, loginUserDto, UpdateUserDto } from "../interfaces/user.dto";
import bcrypt from "bcrypt"

export class UserRepositoryMongo implements UserRepository {

  async createUser(data: CreateUsertDto) {
    const hashPassword = await bcrypt.hash(data.contraseña.toString(), 10);
    const user = { ...data, contraseña: hashPassword };
    const createUser = await UserModel.create(user);
    return createUser;
  }

  async loginUser(data: loginUserDto) {
    const user = await UserModel.findOne({ correo: data.correo });
    if (!user) {
      throw new Error("Invalid credentials")
    }
    const isPasswordValid = await bcrypt.compare(data.contraseña.toString(), user.contraseña.toString());
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    return user;
  }

  async getAllUsers(): Promise<CreateUsertDto[]> {
    return UserModel.find().lean().exec();
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<CreateUsertDto | null> {
    let user = { ...data };
    if (data.contraseña !== undefined) {
      const hashPassword = await bcrypt.hash(data.contraseña.toString(), 10);
      user = { ...data, contraseña: hashPassword };
    }
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true }).lean().exec();
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }

  async findUserByEmail(email: string): Promise<CreateUsertDto | null> {
    return UserModel.findOne({ correo: email }).lean().exec();
  }

  async getById(id: string): Promise<CreateUsertDto | null> {
    return UserModel.findById(id).lean().exec();
  }

  async addVehicleToUser(userId: string, vehicleId: string): Promise<CreateUsertDto | null> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (user.rol !== 'conductor' && user.rol !== 'ambos') {
      throw new Error("Solo los conductores pueden agregar vehículos");
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { vehicles: vehicleId } },
      { new: true }
    ).populate('vehicles').lean().exec();
    return updatedUser;
  }

  async removeVehicleFromUser(userId: string, vehicleId: string): Promise<CreateUsertDto | null> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (user.rol !== 'conductor' && user.rol !== 'ambos') {
      throw new Error("Solo los conductores pueden eliminar vehículos");
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { vehicles: vehicleId } },
      { new: true }
    ).lean().exec();
    return updatedUser;
  }

  async getUserVehicles(userId: string): Promise<CreateUsertDto | null> {
    const user = await UserModel.findById(userId).populate('vehicles').lean().exec();
    return user as CreateUsertDto | null;
  }
}