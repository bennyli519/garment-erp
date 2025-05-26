'use client'

import AdminLayout from '@/app/admin/components/layout/admin-layout'
import RoleList from './components/RoleList'

export default function RolePage() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <RoleList />
    </div>
  )
} 