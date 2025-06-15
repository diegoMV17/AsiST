import { UserRepository } from "../interfaces/user.repository";
import { UserModel } from "../models/user.model";
import { CreateUsertDto, loginUserDto, UpdateUserDto } from "../interfaces/user.dto";
import bcrypt from "bcrypt"

export class UserRepositoryMongo implements UserRepository {
  
  async createUser(data: CreateUsertDto){
    const hashPassword = await bcrypt.hash(data.contraseña.toString(), 10);
    const user = {...data, contraseña: hashPassword};
    const createUser = await UserModel.create(user);
    return createUser;
  }

  async loginUser(data: loginUserDto){
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
    return UserModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
  }

  async deleteUser(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }

  async findUserByEmail(email: string): Promise<CreateUsertDto | null> {
    return UserModel.findOne({ correo: email }).lean().exec();
  }
}