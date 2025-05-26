import { NextRequest } from 'next/server';
import { ForgotPasswordController } from '@/backend/api/controllers/auth/forgot-password.controller';
 
export async function POST(req: NextRequest) {
  return ForgotPasswordController.forgotPassword(req);
} 