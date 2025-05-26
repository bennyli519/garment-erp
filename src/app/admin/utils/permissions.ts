import { prisma } from '@/lib/prisma'

export async function checkUserPermission(userId: string, permissionCode: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true
              }
            }
          }
        }
      }
    })

    if (!user || !user.isActive) {
      return false
    }

    // 如果是系统管理员，拥有所有权限
    if (user.role.code === 'ADMIN') {
      return true
    }

    // 检查用户是否有特定权限
    const hasPermission = user.role.permissions.some(
      rp => rp.permission.code === permissionCode
    )

    return hasPermission
  } catch (error) {
    console.error('Permission check error:', error)
    return false
  }
}

export async function getUserPermissions(userId: string): Promise<string[]> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true
              }
            }
          }
        }
      }
    })

    if (!user || !user.isActive) {
      return []
    }

    return user.role.permissions.map(rp => rp.permission.code)
  } catch (error) {
    console.error('Get permissions error:', error)
    return []
  }
} 