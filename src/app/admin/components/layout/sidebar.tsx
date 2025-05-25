'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Box } from 'lucide-react'

const menuItems = [
  { icon: Home, label: '首页', href: '/admin' },
  { icon: Users, label: '用户管理', href: '/admin/users' },
  { icon: Box, label: '产品管理', href: '/admin/products' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="min-h-screen w-64 border-r bg-white">
      {/* Logo */}
      <div className="flex h-14 items-center border-b px-6">
        <span className="text-xl font-bold">Garment ERP</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
} 