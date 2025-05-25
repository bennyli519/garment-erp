import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  // 暂时移除 adapter，因为我们使用 JWT 策略
  // adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  // 添加网站 URL 配置
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("请输入邮箱和密码")
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            include: {
              role: true,
              company: true,
              department: true
            }
          })

          if (!user) {
            throw new Error("用户不存在")
          }

          if (!user.isActive) {
            throw new Error("用户已被禁用")
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)

          if (!isValid) {
            throw new Error("密码错误")
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            company: user.company,
            department: user.department
          }
        } catch (error) {
          console.error('Auth error:', error)
          throw error
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          company: user.company,
          department: user.department
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          company: token.company,
          department: token.department
        }
      }
    }
  }
} 