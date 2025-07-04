import { VehicleRepository } from '../interfaces/vehicle.repository';
import { VehiculoModel } from '../models/vehicles.model';
import { CreateVehicleDto, updatedVehicleDto } from '../interfaces/vehicle.dto';

export class VehicleRepositoryMongo implements VehicleRepository {    

    async createVehicle(data: CreateVehicleDto) {
        const vehicle = await VehiculoModel.create(data);
        return vehicle;
    }

    async getAllVehicles(): Promise<CreateVehicleDto[]> {
        return VehiculoModel.find().lean().exec();
    }

    async getById(id: string): Promise<CreateVehicleDto | null> {
        return VehiculoModel.findById(id).lean().exec();
    }

    async updateVehicle(id: string, data: updatedVehicleDto): Promise<CreateVehicleDto | null> {
        const updatedVehicle = await VehiculoModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
        return updatedVehicle;
    }
    async deleteVehicle(id: string): Promise<void> {
        await VehiculoModel.findByIdAndDelete(id).exec();
    }
    async findVehicleByPlaca(placa: string): Promise<CreateVehicleDto | null> {
        return VehiculoModel.findOne({
            placa: placa
        }).lean().exec();
    }
}