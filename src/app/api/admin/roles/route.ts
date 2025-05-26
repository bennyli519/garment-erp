import { RoleController } from '@/backend/controllers/role.controller';

export async function GET(req: Request) {
  return RoleController.findAll(req);
}

export async function POST(req: Request) {
  return RoleController.create(req);
} 