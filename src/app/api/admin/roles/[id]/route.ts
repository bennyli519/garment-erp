import { RoleController } from '@/backend/controllers/role.controller';

export async function GET(
  req: Request, 
  { params }: { params: { id: string } }
) {
  return RoleController.findOne(params.id);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  return RoleController.update(params.id, req);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return RoleController.remove(params.id);
} 