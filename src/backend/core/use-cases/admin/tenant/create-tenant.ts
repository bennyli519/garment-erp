import { Tenant } from '@/backend/domain/entities/tenant'
import { ITenantRepository } from '@/backend/domain/interfaces/repositories/tenant-repository'
import { AppError } from '@/backend/shared/errors/app-error'

export interface CreateTenantDTO {
  name: string
  domain?: string
}

export class CreateTenantUseCase {
  constructor(private tenantRepository: ITenantRepository) {}

  async execute(data: CreateTenantDTO): Promise<Tenant> {
    // 检查域名是否已存在
    if (data.domain) {
      const existingTenant = await this.tenantRepository.findByDomain(data.domain)
      if (existingTenant) {
        throw AppError.badRequest('Domain already exists')
      }
    }

    // 创建租户实体
    const tenant = Tenant.create({
      name: data.name,
      domain: data.domain
    })

    // 保存租户
    await this.tenantRepository.create(tenant)

    return tenant
  }
} 