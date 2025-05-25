import { useSession } from 'next-auth/react'
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/app/admin/data/permissions'

export function usePermission() {
  const { data: session } = useSession()
  const userPermissions = session?.user?.permissions || []

  return {
    /**
     * Check if has specific permission
     * @param permissionCode Permission code
     */
    can: (permissionCode: string): boolean => {
      return hasPermission(userPermissions, permissionCode)
    },

    /**
     * Check if has any of the permissions
     * @param permissionCodes Permission code list
     */
    canAny: (permissionCodes: string[]): boolean => {
      return hasAnyPermission(userPermissions, permissionCodes)
    },

    /**
     * Check if has all permissions
     * @param permissionCodes Permission code list
     */
    canAll: (permissionCodes: string[]): boolean => {
      return hasAllPermissions(userPermissions, permissionCodes)
    },

    /**
     * Get all user permissions
     */
    permissions: userPermissions,
  }
}

export function usePermissionLoading() {
  const { status } = useSession()
  return status === 'loading'
} 