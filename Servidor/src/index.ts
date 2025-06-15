import dotenv from 'dotenv';
dotenv.config();

import { USE_DATABASE } from './config/database.config';
import app from './app';
import { MongoConnection } from './repositories/mongodb.repository';

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
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