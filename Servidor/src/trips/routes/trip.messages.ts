import { Router } from 'express';
import Message from '../models/trip.model.messages'; 

const router = Router();

// Obtener mensajes de un viaje
router.get('/:tripId', async (req, res) => {
  const { tripId } = req.params;
  const messages = await Message.find({ tripId }).sort({ timestamp: 1 });
  res.json(messages);
});

// Enviar mensaje
router.post('/', async (req, res) => {
  const { tripId, senderId, receiverId, text } = req.body;
  const message = new Message({ tripId, senderId, receiverId, text });
  await message.save();
  res.json(message);
});

export default router;
