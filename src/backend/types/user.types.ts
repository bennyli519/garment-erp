export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface User {
  id: string
  email: string
  name: string
  status: UserStatus
  tenantId: string
  roleId: string
  departmentId?: string | null
  emailVerified?: Date | null
  image?: string | null
  lastLogin?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDto {
  email: string
  password: string
  name: string
  tenantId: string
  roleId: string
  departmentId?: string | null
  image?: string | null
  status?: UserStatus
}

export interface UpdateUserDto {
  email?: string
  password?: string
  name?: string
  tenantId?: string
  roleId?: string
  departmentId?: string | null
  image?: string | null
  status?: UserStatus
} 