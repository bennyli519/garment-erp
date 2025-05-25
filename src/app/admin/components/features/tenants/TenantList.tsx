'use client'

import { useTenants } from '@/app/admin/hooks/useTenants'
import { Button } from '@/app/admin/components/ui/button'
import { Card } from '@/app/admin/components/ui/card'

export function TenantList() {
  const { data: tenants, isLoading } = useTenants()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tenants</h2>
        <Button>Add Tenant</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tenants?.map((tenant) => (
          <Card key={tenant.id} className="p-4">
            <h3 className="font-semibold">{tenant.name}</h3>
            {tenant.domain && (
              <p className="text-sm text-gray-500">{tenant.domain}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
} 