import dotenv from 'dotenv';
dotenv.config();

import { USE_DATABASE } from './config/database.config';
import app from './app';
import { MongoConnection } from './repositories/mongodb.repository';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const PORT = process.env.PORT || 8080;

// Crear servidor HTTP con la app de Express
const httpServer = createServer(app);

// Configurar Socket.IO
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*", // Cambiar a tu dominio en producción
    methods: ["GET", "POST"]
  }
});

// Evento de conexión de sockets
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

httpServer.listen(PORT, async () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);

  const mongoConnection = MongoConnection.getInstance();

  if (USE_DATABASE) {
    // Conectar a la DB
    const isConnected = await mongoConnection.connect();
    if (!isConnected) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Database connection failed" }),
      };
    }
  }
});
