import { Role, Company, Department } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    role: Role
    company: Company
    department: Department | null
  }

  interface Session {
    user: User & {
      id: string
      role: Role
      company: Company
      department: Department | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
    company: Company
    department: Department | null
  }
} 