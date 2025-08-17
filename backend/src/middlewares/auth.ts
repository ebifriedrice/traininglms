import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import { verifyToken } from '../utils/jwt.js';

export function requireAuth(ctx: any) {
  if (!ctx.user) throw new AuthenticationError('Unauthorized');
}

export function requireRole(role: 'ADMIN' | 'STUDENT') {
  return (ctx: any) => {
    requireAuth(ctx);
    if (ctx.user.role !== role) throw new ForbiddenError('Forbidden');
  };
}

export function parseAuthHeader(authHeader?: string) {
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
