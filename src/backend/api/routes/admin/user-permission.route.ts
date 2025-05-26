import { NextRequest } from 'next/server'
import { UserPermissionController } from '@/backend/controllers/admin/user/user-permission.controller'

export const userPermissionRoutes = {
  GET: async (req: NextRequest) => {
    return UserPermissionController.list(req)
  },

  POST: async (req: NextRequest) => {
    return UserPermissionController.assign(req)
  },

  DELETE: async (req: NextRequest) => {
    return UserPermissionController.revoke(req)
  }
} 