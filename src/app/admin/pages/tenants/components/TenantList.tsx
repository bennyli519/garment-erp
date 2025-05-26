'use client'

import { useState } from 'react'
import { Button, Table, message } from 'antd'

import useTenants from '../hooks/useTenants'
import { usePermissions } from '@/app/admin/hooks/usePermissions'
import TenantForm from './TenantForm'


export default function TenantList() {
  const { tenants, loading, fetchTenants } = useTenants()
  const { hasPermission, isAdmin } = usePermissions()
  const [formVisible, setFormVisible] = useState(false)
  const [editingTenant, setEditingTenant] = useState(null)

  // TODO: Define columns according to your tenant entity
  const columns = [
    { title: '公司名', dataIndex: 'name', key: 'name' },
    { title: '编码', dataIndex: 'code', key: 'code' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { 
      title: '操作', 
      key: 'action', 
      render: (_, record) => (
        <div>
          {(isAdmin || hasPermission('system:tenant:edit')) && (
            <Button type="link" onClick={() => { setEditingTenant(record); setFormVisible(true) }}>
              编辑
            </Button>
          )}
        </div>
      )
    },
  ]

  return (
    <div>
      <div className="mb-4 flex justify-between">
        {(isAdmin || hasPermission('system:tenant:create')) && (
          <Button type="primary" onClick={() => { setEditingTenant(null); setFormVisible(true) }}>
            新增公司/租户
          </Button>
        )}
      </div>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={tenants}
        columns={columns}
      />
      <TenantForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        tenant={editingTenant}
        onSuccess={fetchTenants}
      />
    </div>
  )
} 