import { VehicleRepository } from '../interfaces/vehicle.repository';
import { VehicleModel as VehicleModel } from '../models/vehicles.model';
import { CreateVehicleDto, updatedVehicleDto } from '../interfaces/vehicle.dto';

export class VehicleRepositoryMongo implements VehicleRepository {    

    async createVehicle(data: CreateVehicleDto) {
        const vehicle = await VehicleModel.create(data);
        return vehicle;
    }

    async getAllVehicles(): Promise<CreateVehicleDto[]> {
        return VehicleModel.find().lean().exec();
    }

    async getById(id: string): Promise<CreateVehicleDto | null> {
        return VehicleModel.findById(id).lean().exec();
    }

    async updateVehicle(id: string, data: updatedVehicleDto): Promise<CreateVehicleDto | null> {
        const updatedVehicle = await VehicleModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
        return updatedVehicle;
    }
    async deleteVehicle(id: string): Promise<void> {
        await VehicleModel.findByIdAndDelete(id).exec();
    }
    async findVehicleByPlaca(placa: string): Promise<CreateVehicleDto | null> {
        return VehicleModel.findOne({
            placa: placa
        }).lean().exec();
    }
    async findVehicleBySerialNumber(serialNumber: string): Promise<CreateVehicleDto | null> {
        return VehicleModel.findOne({
            serialNumber: serialNumber
        }).lean().exec();
    }
}