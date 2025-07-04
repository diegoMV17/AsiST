import { CreateVehicleDto, updatedVehicleDto } from '../interfaces/vehicle.dto';
import { VehicleRepository } from '../interfaces/vehicle.repository';

export class VehicleService {
    constructor(private vehicleRepository: VehicleRepository) { }

    async createVehicle(data: CreateVehicleDto): Promise<CreateVehicleDto> {
        return this.vehicleRepository.createVehicle(data);
    }

    async getAllVehicles(): Promise<CreateVehicleDto[]> {
        return this.vehicleRepository.getAllVehicles();
    }
    
    async getVehicleById(id: string): Promise<CreateVehicleDto | null> {
        return this.vehicleRepository.getById(id);
    }
    
    async updateVehicle(id: string, data: updatedVehicleDto): Promise<CreateVehicleDto | null> {
        return this.vehicleRepository.updateVehicle(id, data);
    }
    
    async deleteVehicle(id: string): Promise<void> {
        return this.vehicleRepository.deleteVehicle(id);
    }
    
    async findVehicleByPlaca(placa: string): Promise<CreateVehicleDto | null> {
        return this.vehicleRepository.findVehicleByPlaca(placa);
    }
}