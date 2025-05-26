import { prisma } from '@/lib/prisma'

export class UserPermissionService {
  /**
   * 获取用户权限列表
   */
  static async getUserPermissions(userId: string) {
    console.log('Getting permissions for user:', userId)
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: {
                  include: {
                    module: true
                  }
                }
              }
            }
          }
        }
      }
    })

    console.log('Found user:', JSON.stringify(user, null, 2))

    if (!user || !user.isActive) {
      console.log('User not found or inactive')
      return {
        permissions: [],
        modules: []
      }
    }

    // 如果是系统管理员，返回所有权限
    let permissions = []
    if (user.role.code === 'SUPER_ADMIN' || user.role.code === 'ADMIN') {
      console.log('User is admin, fetching all permissions')
      const allPermissions = await prisma.permission.findMany({
        where: {
          OR: [
            { isSystem: true },
            { tenantId: user.tenantId }
          ]
        },
        include: {
          module: true
        }
      })
      console.log('All permissions:', JSON.stringify(allPermissions, null, 2))
      permissions = allPermissions
    } else {
      // 返回用户角色的权限
      console.log('User role permissions:', JSON.stringify(user.role.permissions, null, 2))
      permissions = user.role.permissions.map(rp => rp.permission)
    }

    // 整理权限和模块数据
    const modules = new Map()
    const permissionList = []

    permissions.forEach(permission => {
      permissionList.push({
        id: permission.id,
        code: permission.code,
        name: permission.name,
        type: permission.type,
        moduleId: permission.moduleId,
        path: permission.path
      })

      if (permission.module) {
        modules.set(permission.module.id, {
          id: permission.module.id,
          code: permission.module.code,
          name: permission.module.name,
          icon: permission.module.icon,
          sort: permission.module.sort,
          path: permission.module.path
        })
      }
    })

    const result = {
      permissions: permissionList,
      modules: Array.from(modules.values())
    }

    console.log('Returning result:', JSON.stringify(result, null, 2))
    return result
  }

  /**
   * 分配权限给用户角色
   */
  static async assignPermissions(userId: string, permissionIds: string[]) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // 验证权限是否存在且可以分配
    const permissions = await prisma.permission.findMany({
      where: {
        id: { in: permissionIds },
        OR: [
          { isSystem: true },
          { tenantId: user.tenantId }
        ]
      }
    })

    if (permissions.length !== permissionIds.length) {
      throw new Error('Invalid permissions')
    }

    // 创建角色-权限关联
    const rolePermissions = await Promise.all(
      permissionIds.map(permissionId =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: user.roleId,
              permissionId
            }
          },
          update: {},
          create: {
            roleId: user.roleId,
            permissionId
          }
        })
      )
    )

    return rolePermissions
  }

  /**
   * 撤销用户角色的权限
   */
  static async revokePermissions(userId: string, permissionIds: string[]) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // 删除角色-权限关联
    await prisma.rolePermission.deleteMany({
      where: {
        roleId: user.roleId,
        permissionId: { in: permissionIds }
      }
    })

    return true
  }
} 