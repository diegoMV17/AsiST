import  {Router, Request, Response} from 'express';
import { UserService } from '../services/user.service';
import { UserRepositoryMongo } from '../repository/user.repository.mongo';

const userRoutes = Router();

const userRepository = new UserRepositoryMongo();

const userService = new UserService(userRepository);

userRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

userRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

userRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await userService.loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error });
  }
});

userRoutes.put('/:id', async (req: Request, res: Response): Promise<void> => {
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
userRoutes.delete('/:id', async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

export { userRoutes };
