import { Schema, model, Types } from 'mongoose';

const certificateSchema = new Schema({
  student: { type: Types.ObjectId, ref: 'User', required: true },
  course: { type: Types.ObjectId, ref: 'Course', required: true },
  serial: { type: String, required: true, unique: true },
  issuedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Certificate = model('Certificate', certificateSchema);
