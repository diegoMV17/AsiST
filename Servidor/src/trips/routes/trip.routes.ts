import { Router, Request, Response } from "express";
import { TripRepositoryMongo } from "../repository/trip.repository.mongo";
import { TripService } from "../services/trip.service";

const tripRoutes = Router();

const tripRepository = new TripRepositoryMongo();
const tripService = new TripService(tripRepository);

tripRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const trips = await tripService.getAllTrips();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
});

// Crear un nuevo viaje
tripRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const trip = await tripService.createTrip(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip', error });
  }
});

// Obtener un viaje por ID
tripRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const trip = await tripService.getTripById(req.params.id);
    if (!trip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip', error });
  }
});

// Actualizar un viaje por ID
tripRoutes.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTrip = await tripService.updateTrip(req.params.id, req.body);
    if (!updatedTrip) {
      res.status(404).json({ message: 'Trip not found' });
      return;
    }
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip', error });
  }
});

// Eliminar un viaje por ID
tripRoutes.delete('/:id', async (req: Request, res: Response) => {
  try {
    await tripService.deleteTrip(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error });
  }
});

// Obtener viajes por driverId
tripRoutes.get('/driver/:driverId', async (req: Request, res: Response) => {
  try {
    const trips = await tripService.getTripsByDriverId(req.params.driverId);
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips by driver', error });
  }
});

// Obtener viajes por vehicleId
tripRoutes.get('/vehicle/:vehicleId', async (req: Request, res: Response) => {
  try {
    const trips = await tripService.getTripsByVehicleId(req.params.vehicleId);
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips by vehicle', error });
  }
});

// Agregar pasajero a un viaje
tripRoutes.post('/:tripId/passengers/:passengerId', async (req: Request, res: Response) => {
  try {
    const updatedTrip = await tripService.addPassengerToTrip(req.params.tripId, req.params.passengerId);
    if (!updatedTrip) {
      res.status(404).json({ message: 'Trip not found or passenger not added' });
      return;
    }
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error adding passenger to trip', error });
  }
});

// Quitar pasajero de un viaje
tripRoutes.delete('/:tripId/passengers/:passengerId', async (req: Request, res: Response) => {
  try {
    const updatedTrip = await tripService.removePassengerFromTrip(req.params.tripId, req.params.passengerId);
    if (!updatedTrip) {
      res.status(404).json({ message: 'Trip not found or passenger not removed' });
      return;
    }
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error removing passenger from trip', error });
  }
});
// Obtener viajes disponibles
tripRoutes.get('/status/available', async (req: Request, res: Response) => {
  try {
    const availableTrips = await tripService.getAvailableTrips();
    res.status(200).json(availableTrips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available trips', error });
  }
}
);

export { tripRoutes };
