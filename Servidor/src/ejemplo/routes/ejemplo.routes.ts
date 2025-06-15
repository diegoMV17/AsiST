import express from 'express';
import { crearEjemplo, listarEjemplos } from '../services/ejemplo.service';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(listarEjemplos());
});

router.post('/', (req, res) => {
  const nuevo = crearEjemplo(req.body);
  res.status(201).json(nuevo);
});

export default router;
