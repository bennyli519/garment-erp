import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/backend/infrastructure/database/prisma';

export class RegisterController {
  static async register(req: NextRequest) {
    try {
      const body = await req.json();
      const { name, companyCode, email, password } = body;
      console.log('body',body)
      console.log('code',companyCode)
      // Check if tenant exists
      const existingTenant = await prisma.tenant.findFirst({
        where: {
          code: {
            equals: companyCode,
            mode: 'insensitive'
          }
        },
      });

      console.log('existingTenant',existingTenant)

      if (existingTenant) {
        return NextResponse.json(
          { error: 'Tenant code already exists' },
          { status: 400 }
        );
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }

      // Get admin role
      const adminRole = await prisma.role.findUnique({
        where: { code: 'ADMIN' },
      });

      if (!adminRole) {
        return NextResponse.json(
          { error: 'System not properly initialized' },
          { status: 500 }
        );
      }

      // Create tenant and user in transaction
      const result = await prisma.$transaction(async (tx) => {
        // Create tenant
        const tenant = await tx.tenant.create({
          data: {
            name,
            code:companyCode,
            type: 'company',
            status: 'active',
            schemaName: companyCode.toLowerCase(), // 使用小写的租户代码作为 schema 名称
          },
        });

        // Create default department
        const department = await tx.department.create({
          data: {
            name: 'Administration',
            code: 'ADMIN',
            path: '/ADMIN',
            level: 1,
            status: 'active',
            tenantId: tenant.id,
          },
        });

        // Hash password
        const hashedPassword = await hash(password, 12);

        // Create user with role
        const user = await tx.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            tenantId: tenant.id,
            departmentId: department.id,
            roleId: adminRole.id,
            isActive: true,
          },
        });

        return { user };
      });

      return NextResponse.json(
        { message: 'Registration successful' },
        { status: 201 }
      );
    } catch (error) {
      console.error('Registration error:', error);
      return NextResponse.json(
        { error: 'Failed to register' },
        { status: 500 }
      );
    }
  }
} 