import mongoose, { Document, Schema } from 'mongoose';
export interface IChatMessage extends Document {
  user: mongoose.Types.ObjectId | undefined;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IChatMessage>('AiChatMessage', chatMessageSchema);
