import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 创建默认角色
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      code: 'ADMIN',
      description: '系统管理员'
    },
  })

  // 创建默认公司
  const defaultCompany = await prisma.company.upsert({
    where: { code: 'DEFAULT' },
    update: {},
    create: {
      name: '默认公司',
      code: 'DEFAULT',
      status: 'active',
      schemaName: 'public'
    },
  })

  // 创建默认部门
  const defaultDepartment = await prisma.department.upsert({
    where: { code: 'IT' },
    update: {},
    create: {
      name: 'IT部门',
      code: 'IT',
      path: '/IT',
      level: 1,
      status: 'active',
      companyId: defaultCompany.id
    },
  })

  // 创建默认管理员用户
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: '系统管理员',
      password: hashedPassword,
      isActive: true,
      roleId: adminRole.id,
      companyId: defaultCompany.id,
      departmentId: defaultDepartment.id
    },
  })

  console.log('Database seeded with default admin user:')
  console.log('Email: admin@example.com')
  console.log('Password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 