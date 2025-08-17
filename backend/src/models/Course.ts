import { Schema, model, Types } from 'mongoose';

export type DeliveryMode = 'ONLINE' | 'OFFLINE' | 'HYBRID';

const courseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  instructor: String,
  price: { type: Number, default: 0 },
  discountPrice: { type: Number },
  saleEndsAt: { type: Date },
  deliveryMode: { type: String, enum: ['ONLINE', 'OFFLINE', 'HYBRID'], required: true },
  durationHours: Number,
  outcomes: [String],
  prerequisites: [String],
  sampleVideoPublicId: String,
  samplePdfPublicId: String,
  lessons: [{ type: Types.ObjectId, ref: 'Lesson' }],
  pdfs: [{
    title: String,
    publicId: String
  }]
}, { timestamps: true });

export const Course = model('Course', courseSchema);
