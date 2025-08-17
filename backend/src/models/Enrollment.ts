import { Schema, model, Types } from 'mongoose';

const enrollmentSchema = new Schema({
  student: { type: Types.ObjectId, ref: 'User', required: true },
  course: { type: Types.ObjectId, ref: 'Course', required: true },
  status: { type: String, enum: ['ACTIVE', 'COMPLETED'], default: 'ACTIVE' },
  completionByAdmin: { type: Boolean, default: false }
}, { timestamps: true });

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment = model('Enrollment', enrollmentSchema);
