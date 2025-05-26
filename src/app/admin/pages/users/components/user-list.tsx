'use client'

import { Table, Space, Button, Tag, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { User, UserStatus } from '@/backend/types/user.types'
import type { Role } from '@/backend/types/role.types'

interface UserListProps {
  users: User[]
  roles: Role[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  loading?: boolean
}

export function UserList({ users, roles, onEdit, onDelete, loading }: UserListProps) {
  const getRoleName = (roleId: string): string => {
    const role = roles.find(r => r.id === roleId)
    return role ? `${role.name}${role.isSystem ? ' (系统)' : ''}` : '未知角色'
  }

  const columns: ColumnsType<User> = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId: string) => getRoleName(roleId),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus) => (
        <Tag color={status === UserStatus.ACTIVE ? 'green' : 'red'}>
          {status === UserStatus.ACTIVE ? '活跃' : '停用'}
        </Tag>
      ),
    },
    {
      title: '租户ID',
      dataIndex: 'tenantId',
      key: 'tenantId',
      ellipsis: true,
      render: (tenantId: string) => {
        const tenantRole = roles.find(r => r.tenantId === tenantId && !r.isSystem)
        if (tenantId && !tenantRole) {
          return <Tooltip title="租户ID">{tenantId.substring(0, 8)}...</Tooltip>
        }
        return tenantId ? <Tooltip title={tenantId}>{tenantId.substring(0, 8)}...</Tooltip> : <Tag>系统用户</Tag>
      }
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin?: Date) => lastLogin ? new Date(lastLogin).toLocaleString() : '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Date) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record: User) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button 
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <Table<User>
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={loading}
      scroll={{ x: 'max-content' }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  )
} 