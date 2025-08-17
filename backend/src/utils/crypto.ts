import bcrypt from 'bcryptjs';

export function hashPassword(plain: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plain, salt);
}

export function verifyPassword(plain: string, hash: string) {
  return bcrypt.compareSync(plain, hash);
}

export function randomPassword(length = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
