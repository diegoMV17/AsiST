import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import ejemploRoutes from './ejemplo/routes/ejemplo.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/ejemplos', ejemploRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

export default app;
