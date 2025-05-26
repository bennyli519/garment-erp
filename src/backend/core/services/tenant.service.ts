import { prisma } from '@/lib/prisma'

export interface CreateTenantData {
  name: string
  code: string
  status?: string
  address?: string
  contact?: string
  phone?: string
}

export interface UpdateTenantData {
  id: string
  name?: string
  code?: string
  status?: string
  address?: string
  contact?: string
  phone?: string
}

export class TenantService {
  static async list() {
    return prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }

  static async findById(id: string) {
    return prisma.tenant.findUnique({
      where: { id }
    })
  }

  static async findByCode(code: string) {
    return prisma.tenant.findFirst({
      where: { code }
    })
  }

  static async create(data: CreateTenantData) {
    // 检查代码是否已存在
    const existingTenant = await this.findByCode(data.code)
    if (existingTenant) {
      throw new Error('Tenant code already exists')
    }

    return prisma.tenant.create({
      data: {
        name: data.name,
        code: data.code,
        status: data.status || 'active',
        address: data.address,
        contact: data.contact,
        phone: data.phone,
        schemaName: data.code.toLowerCase(),
        type: 'company'
      }
    })
  }

  static async update(data: UpdateTenantData) {
    const { id, ...updateData } = data

    // 检查租户是否存在
    const existingTenant = await this.findById(id)
    if (!existingTenant) {
      throw new Error('Tenant not found')
    }

    // 如果更新代码，检查是否已存在
    if (updateData.code && updateData.code !== existingTenant.code) {
      const duplicateTenant = await this.findByCode(updateData.code)
      if (duplicateTenant) {
        throw new Error('Tenant code already exists')
      }
    }

    return prisma.tenant.update({
      where: { id },
      data: {
        ...updateData,
        schemaName: updateData.code?.toLowerCase() || existingTenant.schemaName
      }
    })
  }

  static async delete(id: string) {
    // 检查租户是否存在
    const existingTenant = await this.findById(id)
    if (!existingTenant) {
      throw new Error('Tenant not found')
    }

    return prisma.tenant.delete({
      where: { id }
    })
  }
} 