import { Types } from 'mongoose';

export interface CreateTripDto {
    driverId: Types.ObjectId;
    vehicleId: Types.ObjectId;
    origen: string;
    destino: string;
    fecha: string;
    hora: string;
    descripcion?: string;
    cupos_disponibles: number;
    disponible: boolean;
    passengers?: Types.ObjectId[]; 
}
export interface UpdateTripDto {
    driverId?: string;
    vehicleId?: string;
    origen?: string;
    destino?: string;
    fecha?: string;
    hora?: string;
    descripcion?: string;
    cupos_disponibles?: number;
    disponible?:boolean;
    passengers?: Types.ObjectId[];
}
