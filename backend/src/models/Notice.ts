import { Schema, model } from 'mongoose';

const noticeSchema = new Schema({
  message: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const Notice = model('Notice', noticeSchema);
