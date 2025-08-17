import { Schema, model, Types } from 'mongoose';

const lessonSchema = new Schema({
  course: { type: Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
  videoPublicId: { type: String },
  durationSec: { type: Number, default: 0 }
}, { timestamps: true });

export const Lesson = model('Lesson', lessonSchema);
