import { AppError } from '@/backend/shared/errors/app-error'

export class Tenant {
  private constructor(
    public readonly id: string,
    private _name: string,
    private _domain?: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}

  // 获取器
  get name(): string {
    return this._name
  }

  get domain(): string | undefined {
    return this._domain
  }

  // 工厂方法
  static create(props: {
    name: string
    domain?: string
    id?: string
  }): Tenant {
    if (props.name.length < 2) {
      throw AppError.badRequest('Tenant name must be at least 2 characters long')
    }

    if (props.domain && props.domain.length < 3) {
      throw AppError.badRequest('Domain must be at least 3 characters long')
    }

    return new Tenant(
      props.id || crypto.randomUUID(),
      props.name,
      props.domain
    )
  }

  // 更新方法
  update(props: { name?: string; domain?: string }): void {
    if (props.name) {
      if (props.name.length < 2) {
        throw AppError.badRequest('Tenant name must be at least 2 characters long')
      }
      this._name = props.name
    }

    if (props.domain !== undefined) {
      if (props.domain && props.domain.length < 3) {
        throw AppError.badRequest('Domain must be at least 3 characters long')
      }
      this._domain = props.domain
    }
  }

  // 业务方法
  validateDomain(domain: string): boolean {
    return domain.length >= 3 && /^[a-zA-Z0-9-]+$/.test(domain)
  }
} 