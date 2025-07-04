import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRoutes } from './usuarios/routes/user.routes';
import { vehicleRoutes } from './vehicles/routes/vehicle.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

export default app;
