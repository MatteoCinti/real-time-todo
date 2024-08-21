import { createHmac } from 'crypto';

export function hashPassword(password: string) {
  const secret = process.env.HASH_SECRET;
  if (!secret) {
    throw new Error('HASH_SECRET is not defined');
  }

  return createHmac('sha256', secret).update(password).digest('hex');
}

export function checkPassword(passwordToCheck: string, savedPassword: string) {
  const secret = process.env.HASH_SECRET;
  if (!secret) {
    throw new Error('HASH_SECRET is not defined');
  }
  const hashedPassToCheck = hashPassword(passwordToCheck);

  return hashedPassToCheck === savedPassword;
}
