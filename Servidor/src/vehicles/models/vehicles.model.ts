import { Schema, model } from 'mongoose';
import { CreateVehicleDto } from '../interfaces/vehicle.dto';

const vehicleSchema = new Schema<CreateVehicleDto>({
    placa: { type: String, required: true, unique: true },
    marca: { type: String, required: true },
    numeroSerie: { type: String, required: true, unique: true },
    soat: { type: String, required: true },
    modelo: { type: String, required: true },
    tipo: { type: String, enum: ['carro', 'SUV', 'camioneta', 'sedan'], required: true },
    color: { type: String, required: true },
    capacidad: { type: Number, required: true },
});

export const VehiculoModel = model<CreateVehicleDto>('Vehicle', vehicleSchema);