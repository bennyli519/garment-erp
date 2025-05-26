import { TenantController } from '@/backend/api/controllers/admin/tenant/tenant.controller'

export const tenantRoutes = {
  GET: TenantController.list,
  POST: TenantController.create,
  PUT: TenantController.update,
  DELETE: TenantController.remove,
} 