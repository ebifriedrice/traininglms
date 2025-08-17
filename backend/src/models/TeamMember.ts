import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true },
  designation: String,
  photoUrl: String
}, { timestamps: true });

export const TeamMember = model('TeamMember', teamSchema);
