'use client'

import AdminLayout from '@/app/admin/components/layout/admin-layout'
import TenantList from './components/TenantList'

export default function TenantPage() {
  return (

      <div className="min-h-[calc(100vh-64px)]">
        <TenantList />
      </div>

  )
} 