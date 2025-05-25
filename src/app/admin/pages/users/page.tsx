'use client'

import { useState } from 'react'
import { Button, Card, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { UserList } from './components/user-list'
import { UserForm } from './components/user-form'

const mockUsers = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '操作员', status: '活跃' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '操作员', status: '停用' },
]

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false)
  const [users, setUsers] = useState(mockUsers)
  const [editingUser, setEditingUser] = useState<typeof mockUsers[0] | null>(null)

  const handleAddUser = (values: any) => {
    setUsers([
      ...users,
      {
        id: users.length + 1,
        ...values,
        status: '活跃',
      },
    ])
    setShowForm(false)
    message.success('添加用户成功')
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDeleteUser = (user: any) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该用户吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setUsers(users.filter((u) => u.id !== user.id))
        message.success('删除用户成功')
      },
    })
  }

  const handleFormSubmit = (values: any) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? { ...user, ...values }
            : user
        )
      )
      message.success('更新用户成功')
    } else {
      handleAddUser(values)
    }
    setShowForm(false)
    setEditingUser(null)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowForm(true)}
        >
          添加用户
        </Button>
      </div>

      {showForm ? (
        <Card title={editingUser ? '编辑用户' : '添加用户'}>
          <UserForm
            initialValues={editingUser || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </Card>
      ) : (
        <UserList
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  )
} 