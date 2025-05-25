'use client'

import { Table, Button, Space, Tag, Modal, Form, Input, Select, Tree } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface Role {
  id: string
  name: string
  code: string
  description: string
  status: 'active' | 'inactive'
  permissions: string[]
}

const mockData: Role[] = [
  {
    id: '1',
    name: '系统管理员',
    code: 'ADMIN',
    description: '系统最高权限管理员',
    status: 'active',
    permissions: ['user_manage', 'role_manage'],
  },
  {
    id: '2',
    name: '生产主管',
    code: 'PRODUCTION_MANAGER',
    description: '生产部门主管',
    status: 'active',
    permissions: ['production_manage'],
  },
  {
    id: '3',
    name: '普通用户',
    code: 'USER',
    description: '普通用户权限',
    status: 'active',
    permissions: ['view_only'],
  },
]

// 权限树数据
const permissionTree = [
  {
    title: '系统管理',
    key: 'system',
    children: [
      {
        title: '员工管理',
        key: 'employee',
        children: [
          { title: '查看员工', key: 'employee:view' },
          { title: '新增员工', key: 'employee:add' },
          { title: '编辑员工', key: 'employee:edit' },
          { title: '删除员工', key: 'employee:delete' },
        ],
      },
      {
        title: '权限管理',
        key: 'permission',
        children: [
          { title: '查看权限', key: 'permission:view' },
          { title: '分配权限', key: 'permission:assign' },
        ],
      },
    ],
  },
  {
    title: '生产管理',
    key: 'production',
    children: [
      {
        title: '生产单管理',
        key: 'order',
        children: [
          { title: '查看生产单', key: 'order:view' },
          { title: '新增生产单', key: 'order:add' },
          { title: '编辑生产单', key: 'order:edit' },
          { title: '删除生产单', key: 'order:delete' },
        ],
      },
    ],
  },
]

export default function RolePage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isPermissionModalVisible, setIsPermissionModalVisible] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [form] = Form.useForm()

  const columns: ColumnsType<Role> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handlePermission(record)}>权限设置</a>
          <a>删除</a>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    setSelectedRole(null)
    setIsModalVisible(true)
  }

  const handleEdit = (role: Role) => {
    setSelectedRole(role)
    form.setFieldsValue(role)
    setIsModalVisible(true)
  }

  const handlePermission = (role: Role) => {
    setSelectedRole(role)
    setIsPermissionModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log('Success:', values)
      setIsModalVisible(false)
      form.resetFields()
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handlePermissionOk = () => {
    setIsPermissionModalVisible(false)
  }

  const handlePermissionCancel = () => {
    setIsPermissionModalVisible(false)
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增角色
        </Button>
      </div>

      <Table columns={columns} dataSource={mockData} rowKey="id" />

      <Modal
        title={selectedRole ? '编辑角色' : '新增角色'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="角色编码"
            rules={[{ required: true, message: '请输入角色编码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
          >
            <Select>
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="权限设置"
        open={isPermissionModalVisible}
        onOk={handlePermissionOk}
        onCancel={handlePermissionCancel}
        width={600}
      >
        <div style={{ marginBottom: 16 }}>
          <strong>角色：</strong>{selectedRole?.name}
        </div>
        <Tree
          checkable
          defaultExpandAll
          treeData={permissionTree}
          defaultCheckedKeys={selectedRole?.permissions}
        />
      </Modal>
    </div>
  )
} 