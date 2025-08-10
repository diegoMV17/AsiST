import { CreateTripDto, UpdateTripDto } from "../interfaces/trip.dto";
import { TripRepository } from "../interfaces/trip.repository";

export class TripService {
    constructor(private tripRepository: TripRepository) { }
    async createTrip(data: CreateTripDto): Promise<CreateTripDto> {
        return this.tripRepository.createTrip(data);
    }
    async getAllTrips(): Promise<CreateTripDto[]> {
        return this.tripRepository.getAllTrips();
    }
    async getTripById(id: string): Promise<CreateTripDto | null> {
        return this.tripRepository.getTripById(id);
    }
    async updateTrip(id: string, data: UpdateTripDto): Promise<CreateTripDto | null> {
        return this.tripRepository.updateTrip(id, data);
    }
    async deleteTrip(id: string): Promise<void> {
        return this.tripRepository.deleteTrip(id);
    }
    async getTripsByDriverId(driverId: string): Promise<CreateTripDto[]> {
        return this.tripRepository.getTripsByDriverId(driverId);
    }
    async getTripsByVehicleId(vehicleId: string): Promise<CreateTripDto[]> {
        return this.tripRepository.getTripsByVehicleId(vehicleId);
    }
    async addPassengerToTrip(tripId: string, passengerId: string): Promise<CreateTripDto | null> {
        return this.tripRepository.addPassengerToTrip(tripId, passengerId);
    }

    async removePassengerFromTrip(tripId: string, passengerId: string): Promise<CreateTripDto | null> {
        return this.tripRepository.removePassengerFromTrip(tripId, passengerId);
    }
    async getAvailableTrips(): Promise<CreateTripDto[]> {
        return this.tripRepository.getAvailableTrips();
    }

}
