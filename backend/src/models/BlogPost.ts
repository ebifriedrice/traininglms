import { Schema, model } from 'mongoose';

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  body: String,
  tags: [String],
  published: { type: Boolean, default: false }
}, { timestamps: true });

export const BlogPost = model('BlogPost', blogPostSchema);
