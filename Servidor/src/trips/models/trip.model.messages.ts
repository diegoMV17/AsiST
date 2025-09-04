import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  tripId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  tripId: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default model<IMessage>('Message', MessageSchema);
