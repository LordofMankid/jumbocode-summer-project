import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  // Add other fields as needed
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
  // Add other fields as needed
});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
