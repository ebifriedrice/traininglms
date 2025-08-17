import { Schema, model } from 'mongoose';

const pageContentSchema = new Schema({
  key: { type: String, required: true, unique: true },
  sections: Schema.Types.Mixed
}, { timestamps: true });

export const PageContent = model('PageContent', pageContentSchema);
