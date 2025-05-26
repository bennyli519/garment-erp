import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Define module permissions directly in seed file
const systemModule = {
  id: 'system',
  code: 'system',
  name: 'System Management',
  type: 'module',
  status: 'active',
  sort: 1,
  icon: 'SettingOutlined',
  functions: [
    {
      id: 'system:employee',
      code: 'system:employee',
      name: 'Employee Management',
      type: 'function',
      moduleId: 'system',
      status: 'active',
      sort: 1,
      icon: 'TeamOutlined',
      path: '/admin/employees',
      actions: [
        {
          id: 'system:employee:view',
          code: 'system:employee:view',
          name: 'View Employee',
          type: 'action',
          functionId: 'system:employee',
          status: 'active',
        },
        {
          id: 'system:employee:create',
          code: 'system:employee:create',
          name: 'Create Employee',
          type: 'action',
          functionId: 'system:employee',
          status: 'active',
        },
        {
          id: 'system:employee:edit',
          code: 'system:employee:edit',
          name: 'Edit Employee',
          type: 'action',
          functionId: 'system:employee',
          status: 'active',
        },
        {
          id: 'system:employee:delete',
          code: 'system:employee:delete',
          name: 'Delete Employee',
          type: 'action',
          functionId: 'system:employee',
          status: 'active',
        },
      ],
    },
    {
      id: 'system:permission',
      code: 'system:permission',
      name: 'Permission Management',
      type: 'function',
      moduleId: 'system',
      status: 'active',
      sort: 2,
      icon: 'SafetyCertificateOutlined',
      path: '/admin/permissions',
      actions: [
        {
          id: 'system:permission:view',
          code: 'system:permission:view',
          name: 'View Permission',
          type: 'action',
          functionId: 'system:permission',
          status: 'active',
        },
        {
          id: 'system:permission:assign',
          code: 'system:permission:assign',
          name: 'Assign Permission',
          type: 'action',
          functionId: 'system:permission',
          status: 'active',
        },
      ],
    },
    {
      id: 'system:role',
      code: 'system:role',
      name: 'Role Management',
      type: 'function',
      moduleId: 'system',
      status: 'active',
      sort: 3,
      icon: 'ProfileOutlined',
      path: '/admin/roles',
      actions: [
        {
          id: 'system:role:view',
          code: 'system:role:view',
          name: 'View Role',
          type: 'action',
          functionId: 'system:role',
          status: 'active',
        },
        {
          id: 'system:role:create',
          code: 'system:role:create',
          name: 'Create Role',
          type: 'action',
          functionId: 'system:role',
          status: 'active',
        },
        {
          id: 'system:role:edit',
          code: 'system:role:edit',
          name: 'Edit Role',
          type: 'action',
          functionId: 'system:role',
          status: 'active',
        },
        {
          id: 'system:role:delete',
          code: 'system:role:delete',
          name: 'Delete Role',
          type: 'action',
          functionId: 'system:role',
          status: 'active',
        },
      ],
    },
    {
      id: 'system:tenant',
      code: 'system:tenant',
      name: 'Tenant Management',
      type: 'function',
      moduleId: 'system',
      status: 'active',
      sort: 4,
      icon: 'BankOutlined',
      path: '/admin/pages/tenants',
      actions: [
        {
          id: 'system:tenant:view',
          code: 'system:tenant:view',
          name: 'View Tenant',
          type: 'action',
          functionId: 'system:tenant',
          status: 'active',
        },
        {
          id: 'system:tenant:create',
          code: 'system:tenant:create',
          name: 'Create Tenant',
          type: 'action',
          functionId: 'system:tenant',
          status: 'active',
        },
        {
          id: 'system:tenant:edit',
          code: 'system:tenant:edit',
          name: 'Edit Tenant',
          type: 'action',
          functionId: 'system:tenant',
          status: 'active',
        },
        {
          id: 'system:tenant:delete',
          code: 'system:tenant:delete',
          name: 'Delete Tenant',
          type: 'action',
          functionId: 'system:tenant',
          status: 'active',
        },
      ],
    },
    {
      id: 'system:user',
      code: 'system:user',
      name: 'User Management',
      type: 'function',
      moduleId: 'system',
      status: 'active',
      sort: 5,
      icon: 'UserOutlined',
      path: '/admin/pages/users',
      actions: [
        {
          id: 'system:user:view',
          code: 'system:user:view',
          name: 'View User',
          type: 'action',
          functionId: 'system:user',
          status: 'active',
        },
        {
          id: 'system:user:create',
          code: 'system:user:create',
          name: 'Create User',
          type: 'action',
          functionId: 'system:user',
          status: 'active',
        },
        {
          id: 'system:user:edit',
          code: 'system:user:edit',
          name: 'Edit User',
          type: 'action',
          functionId: 'system:user',
          status: 'active',
        },
        {
          id: 'system:user:delete',
          code: 'system:user:delete',
          name: 'Delete User',
          type: 'action',
          functionId: 'system:user',
          status: 'active',
        },
      ],
    },
  ],
}

const productionModule = {
  id: 'production',
  code: 'production',
  name: 'Production Management',
  type: 'module',
  status: 'active',
  sort: 2,
  icon: 'BuildOutlined',
  functions: [
    {
      id: 'production:order',
      code: 'production:order',
      name: 'Production Order',
      type: 'function',
      moduleId: 'production',
      status: 'active',
      sort: 1,
      icon: 'FileTextOutlined',
      path: '/admin/production/orders',
      actions: [
        {
          id: 'production:order:view',
          code: 'production:order:view',
          name: 'View Order',
          type: 'action',
          functionId: 'production:order',
          status: 'active',
        },
        {
          id: 'production:order:create',
          code: 'production:order:create',
          name: 'Create Order',
          type: 'action',
          functionId: 'production:order',
          status: 'active',
        },
        {
          id: 'production:order:edit',
          code: 'production:order:edit',
          name: 'Edit Order',
          type: 'action',
          functionId: 'production:order',
          status: 'active',
        },
        {
          id: 'production:order:delete',
          code: 'production:order:delete',
          name: 'Delete Order',
          type: 'action',
          functionId: 'production:order',
          status: 'active',
        },
      ],
    },
    {
      id: 'production:process',
      code: 'production:process',
      name: 'Production Process',
      type: 'function',
      moduleId: 'production',
      status: 'active',
      sort: 2,
      icon: 'ExperimentOutlined',
      path: '/admin/production/process',
      actions: [
        {
          id: 'production:process:view',
          code: 'production:process:view',
          name: 'View Process',
          type: 'action',
          functionId: 'production:process',
          status: 'active',
        },
        {
          id: 'production:process:create',
          code: 'production:process:create',
          name: 'Create Process',
          type: 'action',
          functionId: 'production:process',
          status: 'active',
        },
        {
          id: 'production:process:edit',
          code: 'production:process:edit',
          name: 'Edit Process',
          type: 'action',
          functionId: 'production:process',
          status: 'active',
        },
        {
          id: 'production:process:delete',
          code: 'production:process:delete',
          name: 'Delete Process',
          type: 'action',
          functionId: 'production:process',
          status: 'active',
        },
      ],
    },
  ],
}

const modulePermissions = [systemModule, productionModule]

async function main() {
  console.log('Start seeding...')

  // 0. Create default tenant first
  const defaultTenant = await prisma.tenant.upsert({
    where: { code: 'SYSTEM' },
    update: {},
    create: {
      name: 'System Tenant',
      code: 'SYSTEM',
      type: 'system',
      status: 'active',
      schemaName: 'system',
    },
  })

  console.log(`Created tenant: ${defaultTenant.name}`)

  // 0.1 Create default department
  const defaultDepartment = await prisma.department.upsert({
    where: { code: 'IT' },
    update: {},
    create: {
      name: 'IT Department',
      code: 'IT',
      path: '/IT',
      level: 1,
      status: 'active',
      tenantId: defaultTenant.id,
    },
  })

  console.log(`Created department: ${defaultDepartment.name}`)

  // 1. Create system modules
  for (const moduleData of modulePermissions) {
    const module = await prisma.module.upsert({
      where: { id: moduleData.id },
      update: {},
      create: {
        id: moduleData.id,
        name: moduleData.name,
        code: moduleData.code,
        icon: moduleData.icon,
        status: moduleData.status,
        sort: moduleData.sort,
        isSystem: true,
      },
    })

    console.log(`Created module: ${module.name}`)

    // 2. Create functions (permissions)
    for (const funcData of moduleData.functions) {
      const permission = await prisma.permission.upsert({
        where: { id: funcData.id },
        update: {},
        create: {
          id: funcData.id,
          name: funcData.name,
          code: funcData.code,
          type: 'page',
          moduleId: module.id,
          isSystem: true,
        },
      })

      console.log(`Created function permission: ${permission.name}`)

      // 3. Create actions (permissions)
      for (const actionData of funcData.actions) {
        const actionPermission = await prisma.permission.upsert({
          where: { id: actionData.id },
          update: {},
          create: {
            id: actionData.id,
            name: actionData.name,
            code: actionData.code,
            type: 'action',
            moduleId: module.id,
            isSystem: true,
          },
        })

        console.log(`Created action permission: ${actionPermission.name}`)
      }
    }
  }

  // 4. Create system roles
  const superAdminRole = await prisma.role.upsert({
    where: { code: 'SUPER_ADMIN' },
    update: {},
    create: {
      name: 'Super Administrator',
      code: 'SUPER_ADMIN',
      isSystem: true,
    },
  })

  const adminRole = await prisma.role.upsert({
    where: { code: 'ADMIN' },
    update: {},
    create: {
      name: 'System Administrator',
      code: 'ADMIN',
      isSystem: true,
    },
  })

  console.log(`Created role: ${superAdminRole.name}`)
  console.log(`Created role: ${adminRole.name}`)

  // 5. Assign all permissions to both admin roles
  const allPermissions = await prisma.permission.findMany({
    where: { isSystem: true },
  })

  // Assign all permissions to SuperAdmin
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    })
  }

  // Assign all permissions to Admin
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    })
  }

  // 6. Create super admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@system.com' },
    update: {
      roleId: superAdminRole.id, // 确保使用 SuperAdmin 角色
    },
    create: {
      email: 'admin@system.com',
      name: 'Super Admin',
      password: hashedPassword,
      roleId: superAdminRole.id, // 使用 SuperAdmin 角色
      tenantId: defaultTenant.id,
      departmentId: defaultDepartment.id,
      isActive: true,
    },
  })

  console.log(`Created super admin user:`)
  console.log(`Email: ${adminUser.email}`)
  console.log(`Password: admin123`)

  console.log('Seeding finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 