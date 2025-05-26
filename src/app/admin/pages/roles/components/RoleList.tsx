'use client'

import { useState } from 'react'
import { Button, Table, message, Modal, Tag, Space, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import useRoles from '../hooks/useRoles'
import { usePermissions } from '@/app/admin/hooks/usePermissions'
import RoleForm from './RoleForm'
import type { Role } from '@/backend/types/role.types'

const { confirm } = Modal

export default function RoleList() {
  const { roles, loading, fetchRoles, deleteRole } = useRoles()
  const { hasPermission, isAdmin } = usePermissions()
  const [formVisible, setFormVisible] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const handleDelete = (role: Role) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除角色 "${role.name}" 吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const success = await deleteRole(role.id)
        if (success) {
          message.success('角色已删除')
        }
      },
    })
  }

  const columns = [
    { 
      title: '角色名称', 
      dataIndex: 'name', 
      key: 'name',
      render: (name: string, record: Role) => (
        <Space>
          {name}
          {record.isSystem && <Tag color="blue">系统</Tag>}
        </Space>
      )
    },
    { 
      title: '编码', 
      dataIndex: 'code', 
      key: 'code' 
    },
    { 
      title: '描述', 
      dataIndex: 'description', 
      key: 'description',
      ellipsis: true 
    },
    {
      title: '租户ID',
      dataIndex: 'tenantId',
      key: 'tenantId',
      ellipsis: true,
      render: (tenantId: string) => {
        if (!tenantId) return <Tag>系统角色</Tag>
        return (
          <Tooltip title={tenantId}>
            {tenantId.substring(0, 8)}...
          </Tooltip>
        )
      }
    },
    { 
      title: '创建时间', 
      dataIndex: 'createdAt', 
      key: 'createdAt',
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString() 
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_: any, record: Role) => (
        <Space size="small">
          {(isAdmin || hasPermission('system:role:edit')) && (
            <Tooltip title="编辑">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => { setEditingRole(record); setFormVisible(true) }}
              />
            </Tooltip>
          )}
          {(isAdmin || hasPermission('system:role:delete')) && !record.isSystem && (
            <Tooltip title="删除">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-4 flex justify-between">
        {(isAdmin || hasPermission('system:role:create')) && (
          <Button 
            type="primary" 
            onClick={() => { setEditingRole(null); setFormVisible(true) }}
          >
            新增角色
          </Button>
        )}
      </div>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={roles}
        columns={columns}
        scroll={{ x: 'max-content' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      <RoleForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        role={editingRole}
        onSuccess={fetchRoles}
      />
    </div>
  )
} 