'use client'

import { Table, Space, Button, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

interface UserListProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  const columns: ColumnsType<User> = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '活跃' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
  )
} 