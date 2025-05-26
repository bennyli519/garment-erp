import { TenantService } from '@/backend/core/services/tenant.service'
import { NextRequest, NextResponse } from 'next/server'

export class TenantController {
  static async list(req: NextRequest) {
    try {
      const tenants = await TenantService.list()
      return NextResponse.json(tenants)
    } catch (error) {
      console.error('List tenants error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  static async create(req: NextRequest) {
    try {
      const data = await req.json()
      const tenant = await TenantService.create(data)
      return NextResponse.json(tenant, { status: 201 })
    } catch (error) {
      console.error('Create tenant error:', error)
      
      if (error instanceof Error) {
        if (error.message === 'Tenant code already exists') {
          return NextResponse.json({ error: error.message }, { status: 400 })
        }
      }
      
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  static async update(req: NextRequest) {
    try {
      const data = await req.json()
      const tenant = await TenantService.update(data)
      return NextResponse.json(tenant)
    } catch (error) {
      console.error('Update tenant error:', error)
      
      if (error instanceof Error) {
        if (error.message === 'Tenant not found') {
          return NextResponse.json({ error: error.message }, { status: 404 })
        }
        if (error.message === 'Tenant code already exists') {
          return NextResponse.json({ error: error.message }, { status: 400 })
        }
      }
      
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  static async remove(req: NextRequest) {
    try {
      const { id } = await req.json()
      await TenantService.delete(id)
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Delete tenant error:', error)
      
      if (error instanceof Error) {
        if (error.message === 'Tenant not found') {
          return NextResponse.json({ error: error.message }, { status: 404 })
        }
      }
      
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
} 