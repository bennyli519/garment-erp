import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export const usePermissions = () => {
  const { data: session } = useSession()
  const [permissions, setPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!session?.user?.id) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/admin/user/permissions')
        if (response.ok) {
          const data = await response.json()
          setPermissions(data.permissions || [])
        }
      } catch (error) {
        console.error('Failed to fetch permissions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPermissions()
  }, [session?.user?.id])

  const hasPermission = (permissionCode: string): boolean => {
    // 如果是超级管理员或系统管理员，拥有所有权限
    if (session?.user?.roleId === 'SUPER_ADMIN' || session?.user?.roleId === 'ADMIN') {
      return true
    }
    return permissions.includes(permissionCode)
  }

  const hasAnyPermission = (permissionCodes: string[]): boolean => {
    return permissionCodes.some(code => hasPermission(code))
  }

  return {
    permissions,
    loading,
    hasPermission,
    hasAnyPermission,
    isAdmin: session?.user?.roleId === 'SUPER_ADMIN' || session?.user?.roleId === 'ADMIN'
  }
} 