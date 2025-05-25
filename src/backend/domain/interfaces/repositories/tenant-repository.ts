import { Tenant } from '@/backend/domain/entities/tenant'

export interface ITenantRepository {
  findById(id: string): Promise<Tenant | null>
  findByDomain(domain: string): Promise<Tenant | null>
  create(tenant: Tenant): Promise<void>
  update(tenant: Tenant): Promise<void>
  delete(id: string): Promise<void>
  list(): Promise<Tenant[]>
} 