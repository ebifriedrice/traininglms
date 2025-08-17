import { Schema, model, Types } from 'mongoose';

const progressSchema = new Schema({
  student: { type: Types.ObjectId, ref: 'User', required: true },
  course: { type: Types.ObjectId, ref: 'Course', required: true },
  lesson: { type: Types.ObjectId, ref: 'Lesson', required: true },
  secondsWatched: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

progressSchema.index({ student: 1, lesson: 1 }, { unique: true });

export const Progress = model('Progress', progressSchema);
