import { Schema, model } from "mongoose";
import { CreateTripDto } from "../interfaces/trip.dto";

const tripSchema = new Schema<CreateTripDto>({
    driverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    descripcion: { type: String, default: '' },
    cupos_disponibles: { type: Number, required: true, min: 1 },
    disponible: { type: Boolean, default: true },
    passengers: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Referencia a los pasajeros
}, {
    timestamps: true
});

export const TripModel = model<CreateTripDto>('Trip', tripSchema);