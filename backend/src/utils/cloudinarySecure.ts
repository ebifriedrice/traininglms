import { cloudinary } from '../config/cloudinary.js';
import { env } from '../config/env.js';

export function getSignedVideoUrl(publicId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + env.CLOUDINARY.SIGNED_URL_TTL_SECONDS;
  return cloudinary.url(publicId, {
    resource_type: 'video',
    type: 'authenticated',
    sign_url: true,
    secure: true,
    expires_at: expiresAt
  });
}

export function getSignedPdfUrl(publicId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + env.CLOUDINARY.SIGNED_URL_TTL_SECONDS;
  return cloudinary.url(publicId, {
    resource_type: 'raw',
    type: 'authenticated',
    sign_url: true,
    secure: true,
    expires_at: expiresAt
  });
}
