import { Role, Company, Department } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    roleId: string
    tenantId: string
    departmentId: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      roleId: string
      tenantId: string
      departmentId: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    roleId: string
    tenantId: string
    departmentId: string | null
  }
} 