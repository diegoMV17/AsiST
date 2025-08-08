import {CreateVehicleDto, updatedVehicleDto} from '../interfaces/vehicle.dto';

export interface VehicleRepository {
  createVehicle: (data: CreateVehicleDto) => Promise<CreateVehicleDto>;
  getAllVehicles: () => Promise<CreateVehicleDto[]>;
  getById: (id: string) => Promise<CreateVehicleDto | null>;
  updateVehicle: (id: string, data: updatedVehicleDto) => Promise<CreateVehicleDto | null>;
  deleteVehicle: (id: string) => Promise<void>;
  findVehicleByPlaca: (placa: string) => Promise<CreateVehicleDto | null>;
  findVehicleBySerialNumber: (serialNumber: string) => Promise<CreateVehicleDto | null>;
}