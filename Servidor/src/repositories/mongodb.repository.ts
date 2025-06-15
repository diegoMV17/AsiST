import mongoose from "mongoose";
import { ConnectionRepository } from "./interfaces/connection.repository";
import { MONGO_URI } from "../config/database.config";

export class MongoConnection implements ConnectionRepository {
    private static instance: MongoConnection;

    private constructor() {}

    public static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }
    public async connect(): Promise<boolean> {
    if (!MONGO_URI) {
      console.error('DB_HOST is not defined in environment variables');
      return false;
    }

    // Verificamos el estado actual de la conexión de mongoose:
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      console.log('MongoDB is already connected or connecting.');
      return true;
    }

    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected successfully');
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      return false;
    }
  }
}
  