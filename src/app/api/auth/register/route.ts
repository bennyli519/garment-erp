import { NextRequest } from 'next/server';
import { RegisterController } from '@/backend/controllers/auth/register.controller';
 
export async function POST(req: NextRequest) {
  return RegisterController.register(req);
} 