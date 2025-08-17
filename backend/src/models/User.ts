import { Schema, model } from 'mongoose';

export type UserRole = 'ADMIN' | 'STUDENT';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  role: { type: String, enum: ['ADMIN', 'STUDENT'], required: true },
  passwordHash: { type: String, required: true },
  sessionId: { type: String, default: null },
  sessionVersion: { type: Number, default: 0 }
}, { timestamps: true });

export const User = model('User', userSchema);
