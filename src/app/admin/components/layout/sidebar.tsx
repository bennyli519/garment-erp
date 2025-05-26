'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Box, Settings, Building2, UserCog, Shield, FileText, Workflow } from 'lucide-react'
import { useUserPermissions } from '../../hooks/useUserPermissions'

// 图标映射
const iconMap = {
  'SettingOutlined': Settings,
  'TeamOutlined': Users,
  'SafetyCertificateOutlined': Shield,
  'ProfileOutlined': FileText,
  'BankOutlined': Building2,
  'UserOutlined': UserCog,
  'BuildOutlined': Box,
  'FileTextOutlined': FileText,
  'ExperimentOutlined': Workflow,
}

// 默认菜单项
const defaultMenuItems = [
  { icon: Home, label: '首页', href: '/admin' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: permissionData, isLoading, error } = useUserPermissions()

  console.log('Permission Data:', permissionData)
  console.log('Is Loading:', isLoading)
  console.log('Error:', error)

  // 根据权限数据生成菜单项
  const menuItems = [...defaultMenuItems]
  
  if (permissionData?.modules) {
    console.log('Modules:', permissionData.modules)
    // 按 sort 排序模块
    const sortedModules = [...permissionData.modules].sort((a, b) => a.sort - b.sort)
    console.log('Sorted Modules:', sortedModules)
    
    // 将模块转换为菜单项
    sortedModules.forEach(module => {
      // 查找该模块下的页面权限
      const pagePermissions = permissionData.permissions.filter(
        p => p.moduleId === module.id && p.type === 'page'
      )
      console.log('Module:', module.name, 'Page Permissions:', pagePermissions)

      // 使用第一个页面权限的路径
      const mainPagePermission = pagePermissions[0]
      if (mainPagePermission?.path) {
        const IconComponent = iconMap[module.icon as keyof typeof iconMap] || Box
        console.log('Adding menu item:', {
          label: module.name,
          href: mainPagePermission.path,
          icon: module.icon
        })
        menuItems.push({
          icon: IconComponent,
          label: module.name,
          href: mainPagePermission.path
        })
      }
    })
  }

  console.log('Final Menu Items:', menuItems)

  if (isLoading) {
    return <div className="min-h-screen w-64 border-r bg-white p-4">Loading...</div>
  }

  if (error) {
    console.error('Error loading permissions:', error)
    return <div className="min-h-screen w-64 border-r bg-white p-4">Error loading menu</div>
  }

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