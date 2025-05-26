import { randomBytes } from 'crypto';
import crypto from 'crypto';

export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

export function generateVerificationToken(): string {
  return generateToken(32);
}

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
} 