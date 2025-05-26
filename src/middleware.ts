import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // 如果访问 admin 路由但没有登录，重定向到登录页
    if (path.startsWith("/admin") && !token) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // 已登录用户可以访问所有 admin 路由
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/login',
      error: '/auth/error'
    }
  }
)

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/api/admin/:path*",
    "/api/dashboard/:path*"
  ]
} 