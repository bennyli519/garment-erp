import { hash } from 'bcryptjs'
// import { UserRepository } from '@/backend/repositories/user.repository' // Will be removed
import { UserStatus } from '@/backend/types/user.types' // Corrected import for enum
import type { User, CreateUserDto, UpdateUserDto } from '@/backend/types/user.types'
import { prisma } from '@/lib/prisma' // Assuming prisma instance is exported from here
import { Prisma } from '@prisma/client' // Import Prisma namespace for types

export class UserService {
  // private userRepository: UserRepository // Will be removed

  // constructor() { // Will be removed
  //   this.userRepository = new UserRepository()
  // }

  private static mapPrismaUserToUserInterface(prismaUser: NonNullable<Prisma.UserGetPayload<{}>>): User {
    return {
      ...prismaUser,
      status: prismaUser.isActive ? UserStatus.ACTIVE : UserStatus.INACTIVE,
      // Ensure all fields from User interface are present, handling potential nulls from Prisma
      departmentId: prismaUser.departmentId ?? undefined,
      emailVerified: prismaUser.emailVerified ?? undefined,
      image: prismaUser.image ?? undefined,
      lastLogin: prismaUser.lastLogin ?? undefined,
    };
  }

  static async create(data: CreateUserDto): Promise<User> {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } })
    if (existingUser) {
      throw new Error('邮箱已被使用')
    }

    const hashedPassword = await hash(data.password, 10)
    
    // Map UserStatus to isActive boolean for Prisma
    const isActive = (data.status || UserStatus.ACTIVE) === UserStatus.ACTIVE;

    const createdUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        tenant: { connect: { id: data.tenantId } },
        role: { connect: { id: data.roleId } },
        ...(data.departmentId && { department: { connect: { id: data.departmentId } } }),
        ...(data.image && { image: data.image }),
        isActive: isActive, // Use isActive based on DTO status
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    return this.mapPrismaUserToUserInterface(createdUser);
  }

  static async findOne(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) return null;
    return this.mapPrismaUserToUserInterface(user);
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return null;
    return this.mapPrismaUserToUserInterface(user);
  }

  static async findAll(tenantId?: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: tenantId ? { tenantId } : undefined,
      orderBy: { createdAt: 'desc' }
    })
    return users.map(user => this.mapPrismaUserToUserInterface(user));
  }

  static async update(id: string, data: UpdateUserDto): Promise<User> {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      throw new Error('用户不存在')
    }

    if (data.email && data.email !== userExists.email) {
      const existingUserWithEmail = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingUserWithEmail && existingUserWithEmail.id !== id) {
        throw new Error('邮箱已被使用')
      }
    }

    const updateData: Prisma.UserUpdateInput = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.status !== undefined) updateData.isActive = data.status === UserStatus.ACTIVE;
    if (data.password) updateData.password = await hash(data.password, 10);
    
    if (data.tenantId) updateData.tenant = { connect: { id: data.tenantId } };
    if (data.roleId) updateData.role = { connect: { id: data.roleId } };
    if (data.departmentId === null) { // Explicitly set to null to disconnect
      updateData.department = { disconnect: true };
    } else if (data.departmentId) { // Connect if ID is provided
      updateData.department = { connect: { id: data.departmentId } };
    }
    
    updateData.updatedAt = new Date();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });
    return this.mapPrismaUserToUserInterface(updatedUser);
  }

  static async remove(id: string): Promise<User> {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      throw new Error('用户不存在')
    }
    const removedUser = await prisma.user.update({
      where: { id },
      data: { isActive: false, updatedAt: new Date() }
    });
    return this.mapPrismaUserToUserInterface(removedUser);
  }

  // Add other user-specific methods here, e.g.:
  // async assignRole(userId: string, roleId: string): Promise<User> { ... }
  // async getUserPermissions(userId: string): Promise<Permission[]> { ... }
}

// Need to import Prisma type for UserUpdateInput if not already globally available
// This might require adding: import { Prisma } from '@prisma/client' 