import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

export type JWTPayload = { uid: string; role: 'ADMIN' | 'STUDENT'; sessionId: string };

export function signToken(payload: JWTPayload) {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as any };
  return jwt.sign(payload, env.JWT_SECRET as Secret, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET as Secret) as JWTPayload;
}
