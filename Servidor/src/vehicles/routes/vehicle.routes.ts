import { Router, Request, Response } from "express";
import { VehicleService } from "../services/vehicle.service";
import { VehicleRepositoryMongo } from "../repository/vehicle.repository.mongo";

const vehicleRoutes = Router();

const vehicleRepository = new VehicleRepositoryMongo();

const vehicleService = new VehicleService(vehicleRepository);

vehicleRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const vehicles = await vehicleService.getAllVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicles", error });
    }
});
vehicleRoutes.get('/:id', async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleService.getVehicleById(req.params.id);
        if (!vehicle) {
            res.status(404).json({ message: "Vehicle not found" });
            return;
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicle", error });
    }
});
vehicleRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Error creating vehicle", error });
    }
});
vehicleRoutes.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedVehicle = await vehicleService.updateVehicle(req.params.id, req.body);
        if (!updatedVehicle) {
            res.status(404).json({ message: "Vehicle not found" });
            return;
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: "Error updating vehicle", error });
    }
});
vehicleRoutes.delete("/:id", async (req: Request, res: Response) => {
    try {
        await vehicleService.deleteVehicle(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting vehicle", error });
    }
});
vehicleRoutes.get('/placa/:placa', async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleService.findVehicleByPlaca(req.params.placa);
        if (!vehicle) {
            res.status(404).json({ message: "Vehicle not found" });
            return;
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicle by placa", error });
    }
});
export { vehicleRoutes };