import { CreateTripDto, UpdateTripDto } from "./trip.dto";


export interface TripRepository {
    createTrip: (data: CreateTripDto) => Promise<CreateTripDto>;
    getAllTrips: () => Promise<CreateTripDto[]>;
    getTripById: (id: string) => Promise<CreateTripDto | null>;
    updateTrip: (id: string, data: UpdateTripDto) => Promise<CreateTripDto | null>;
    deleteTrip: (id: string) => Promise<void>;
    getTripsByDriverId: (driverId: string) => Promise<CreateTripDto[]>;
    getTripsByVehicleId: (vehicleId: string) => Promise<CreateTripDto[]>;
    addPassengerToTrip: (tripId: string, passengerId: string) => Promise<CreateTripDto | null>;
    removePassengerFromTrip: (tripId: string, passengerId: string) => Promise<CreateTripDto | null>;
}