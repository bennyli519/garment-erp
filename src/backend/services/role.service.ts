import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import type { Role, CreateRoleDto, UpdateRoleDto } from '@/backend/types/role.types';
// import type { Permission } from '@/backend/types/permission.types'; // If needed for detailed permission mapping

export class RoleService {
  private static mapPrismaRoleToRoleInterface(prismaRole: Prisma.RoleGetPayload<{ include: { permissions: { include: { permission: true } } } }>): Role {
    // const mappedPermissions = prismaRole.permissions.map(rp => rp.permission);
    return {
      ...prismaRole,
      // permissions: mappedPermissions, // If you want to include permissions directly
      description: prismaRole.description ?? undefined,
      tenantId: prismaRole.tenantId ?? undefined,
    };
  }

  static async create(data: CreateRoleDto): Promise<Role> {
    const { permissionIds, ...roleData } = data;

    const existingRole = await prisma.role.findFirst({
      where: {
        code: roleData.code,
        tenantId: roleData.tenantId ?? null, // Handle system vs tenant roles
      },
    });

    if (existingRole) {
      throw new Error(
        `Role with code '${roleData.code}' already exists` +
        (roleData.tenantId ? ` for this tenant.` : ' at system level.')
      );
    }

    const createdRole = await prisma.role.create({
      data: {
        ...roleData,
        isSystem: roleData.isSystem ?? (roleData.tenantId ? false : true),
        permissions: permissionIds?.length 
          ? {
              create: permissionIds.map((permissionId) => ({
                permission: { connect: { id: permissionId } },
              })),
            }
          : undefined,
      },
      include: { permissions: { include: { permission: true } } }, // Include permissions on create
    });
    return this.mapPrismaRoleToRoleInterface(createdRole);
  }

  static async findOne(id: string): Promise<Role | null> {
    const role = await prisma.role.findUnique({
      where: { id },
      include: { permissions: { include: { permission: true } } },
    });
    if (!role) return null;
    return this.mapPrismaRoleToRoleInterface(role);
  }

  static async findAll(tenantId?: string | null): Promise<Role[]> {
    const roles = await prisma.role.findMany({
      where: {
        OR: [
          { tenantId: tenantId ?? null }, // Roles for the specific tenant (or null for system roles if tenantId is null)
          { isSystem: true },          // Always include system roles
        ],
      },
      orderBy: { name: 'asc' },
      include: { permissions: { include: { permission: true } } },
    });
    return roles.map(role => this.mapPrismaRoleToRoleInterface(role));
  }

  static async update(id: string, data: UpdateRoleDto): Promise<Role | null> {
    const { permissionIds, ...roleUpdateData } = data;

    const roleExists = await prisma.role.findUnique({ where: { id } });
    if (!roleExists) {
      throw new Error('Role not found');
    }

    // Handle unique constraint for code within tenant or system
    if (roleUpdateData.code) {
      const existingRoleWithCode = await prisma.role.findFirst({
        where: {
          code: roleUpdateData.code,
          tenantId: roleUpdateData.tenantId !== undefined ? roleUpdateData.tenantId : roleExists.tenantId,
          id: { not: id },
        },
      });
      if (existingRoleWithCode) {
        throw new Error(
          `Role with code '${roleUpdateData.code}' already exists` +
          (roleUpdateData.tenantId || roleExists.tenantId ? ` for this tenant.` : ' at system level.')
        );
      }
    }
    
    const updatedRole = await prisma.role.update({
      where: { id },
      data: {
        ...roleUpdateData,
        // If permissionIds is provided, disconnect old and connect new
        ...(permissionIds && {
          permissions: {
            deleteMany: {}, // Remove all existing role-permission links for this role
            create: permissionIds.map((permissionId) => ({
              permission: { connect: { id: permissionId } },
            })),
          },
        }),
      },
      include: { permissions: { include: { permission: true } } },
    });
    return this.mapPrismaRoleToRoleInterface(updatedRole);
  }

  static async remove(id: string): Promise<Role | null> {
    const roleExists = await prisma.role.findUnique({ where: { id } });
    if (!roleExists) {
      throw new Error('Role not found');
    }
    if (roleExists.isSystem) {
        throw new Error('System roles cannot be deleted.');
    }
    // Need to handle users assigned to this role before deletion or use soft delete
    // For now, direct deletion:
    await prisma.rolePermission.deleteMany({ where: { roleId: id } }); // Delete associations first
    const deletedRole = await prisma.role.delete({ where: { id } });
    return this.mapPrismaRoleToRoleInterface(deletedRole); // This will fail as it's deleted, map before delete or return void
  }
} 