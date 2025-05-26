import { NextRequest } from 'next/server';
import { ResetPasswordController } from '@/backend/api/controllers/auth/reset-password.controller';
 
export async function POST(req: NextRequest) {
  return ResetPasswordController.resetPassword(req);
} 