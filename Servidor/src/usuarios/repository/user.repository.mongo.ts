import { UserRepository } from "../interfaces/user.repository";
import { UserModel } from "../models/user.model";
import { CreateUsertDto, UpdateUserDto } from "../interfaces/user.dto";

export class UserRepositoryMongo implements UserRepository {
  async createUser(data: CreateUsertDto): Promise<CreateUsertDto> {
    const user = new UserModel(data);
    await user.save();
    return user.toObject();
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