import { CreateTripDto, UpdateTripDto } from "../interfaces/trip.dto";
import { TripRepository } from "../interfaces/trip.repository";
import { TripModel } from "../models/trip.model";

export class TripRepositoryMongo implements TripRepository{
    async createTrip(data: CreateTripDto): Promise<CreateTripDto> {
        const trip = await TripModel.create(data);
        return trip;
    }
    
    async getAllTrips(): Promise<CreateTripDto[]> {
        return TripModel.find().lean().exec();
    }
    
    async getTripById(id: string): Promise<CreateTripDto | null> {
        return TripModel.findById(id).lean().exec();
    }
    
    async updateTrip(id: string, data: UpdateTripDto): Promise<CreateTripDto | null> {
        const updatedTrip = await TripModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
        return updatedTrip;
    }
    
    async deleteTrip(id: string): Promise<void> {
        await TripModel.findByIdAndDelete(id).exec();
    }
    
    async getTripsByDriverId(driverId: string): Promise<CreateTripDto[]> {
        return TripModel.find({ driverId }).lean().exec();
    }
    
    async getTripsByVehicleId(vehicleId: string): Promise<CreateTripDto[]> {
        return TripModel.find({ vehicleId }).lean().exec();
    }
    
    async addPassengerToTrip(tripId: string, passengerId: string): Promise<CreateTripDto | null> {
        const trip = await TripModel.findByIdAndUpdate(
        tripId,
        { $addToSet: { passengers: passengerId } },
        { new: true }
        ).lean().exec();
        return trip;
    }
    
    async removePassengerFromTrip(tripId: string, passengerId: string): Promise<CreateTripDto | null> {
        const trip = await TripModel.findByIdAndUpdate(
        tripId,
        { $pull: { passengers: passengerId } },
        { new: true }
        ).lean().exec();
        return trip;
    }
    async getAvailableTrips(): Promise<CreateTripDto[]> {
        return TripModel.find({ disponible: true }).lean().exec();
    }
}