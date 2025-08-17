import { Schema, model } from 'mongoose';

const galleryItemSchema = new Schema({
  title: String,
  imageUrl: String
}, { timestamps: true });

export const GalleryItem = model('GalleryItem', galleryItemSchema);
