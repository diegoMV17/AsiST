import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserRepositoryMongo } from '../repository/user.repository.mongo';
import { authMiddleware, roleMiddleware, ownershipMiddleware } from '../../middlewares/auth.middleware';

const userRoutes = Router();

const userRepository = new UserRepositoryMongo();
const userService = new UserService(userRepository);

// Rutas públicas (no requieren autenticación)
userRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await userService.loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error });
  }
});

userRoutes.post('/register', async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Middleware de autenticación para todas las rutas siguientes
userRoutes.use(authMiddleware);

// Rutas que requieren autenticación
// Solo admins pueden ver todos los usuarios
userRoutes.get('/', roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Los usuarios pueden ver su propio perfil, los admins pueden ver cualquier perfil
userRoutes.get('/:id', ownershipMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Los usuarios pueden actualizar su propio perfil, los admins pueden actualizar cualquier perfil
userRoutes.put('/:id', ownershipMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Solo admins pueden eliminar usuarios
userRoutes.delete('/:id', roleMiddleware(['admin']), async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// Rutas de vehículos - Los usuarios pueden gestionar sus propios vehículos
userRoutes.post('/:userId/vehicles/:vehicleId', ownershipMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId, vehicleId } = req.params;
    const updatedUser = await userService.addVehicleToUser(userId, vehicleId);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle to user', error });
  }
});

userRoutes.delete('/:userId/vehicles/:vehicleId', ownershipMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId, vehicleId } = req.params;
    const updatedUser = await userService.removeVehicleFromUser(userId, vehicleId);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error removing vehicle from user', error });
  }
});

userRoutes.get('/:userId/vehicles', ownershipMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userVehicles = await userService.getUserVehicles(userId);
    res.status(200).json(userVehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user vehicles', error });
  }
});



// Rutas para el rol ambos - Los usuarios con rol ambos pueden gestionar sus propios vehículos

userRoutes.post('/:userId/vehicles/:vehicleId',roleMiddleware(['ambos']), ownershipMiddleware, async (req: Request, res: Response) => {
    try {
      const { userId, vehicleId } = req.params;
      const updatedUser = await userService.addVehicleToUser(userId, vehicleId);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error adding vehicle to user', error });
    }
  }
);

userRoutes.delete('/:userId/vehicles/:vehicleId',roleMiddleware(['ambos']), ownershipMiddleware, async (req: Request, res: Response) => {
    try {
      const { userId, vehicleId } = req.params;
      const updatedUser = await userService.removeVehicleFromUser(userId, vehicleId);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error removing vehicle from user', error });
    }
  }
);

userRoutes.get('/:userId/vehicles',roleMiddleware(['ambos']),ownershipMiddleware, async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userVehicles = await userService.getUserVehicles(userId);
      res.status(200).json(userVehicles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user vehicles', error });
    }
  }
);

export { userRoutes };