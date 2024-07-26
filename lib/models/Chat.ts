import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  content: string;
  role: string;
  date: Date;
  // Add other fields as needed
}

const ChatSchema: Schema = new Schema({
  content: { type: String, required: true },
  role: { type: String, required: true },
  date: { type: Date }
});

ChatSchema.index({ date: 1 });

export default mongoose.models.Chat ||
  mongoose.model<IChat>('Chat', ChatSchema);
