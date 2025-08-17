import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT || 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  SESSION_SALT: process.env.SESSION_SALT!,
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    API_KEY: process.env.CLOUDINARY_API_KEY!,
    API_SECRET: process.env.CLOUDINARY_API_SECRET!,
    SECURE_DELIVERY: process.env.CLOUDINARY_SECURE_DELIVERY === 'true',
    SIGNED_URL_TTL_SECONDS: Number(process.env.CLOUDINARY_SIGNED_URL_TTL_SECONDS || 3600)
  },
  APP_NAME: process.env.APP_NAME || 'XYZ LMS'
};
