'use client'

import { Table, Button, Space, Tag, Tabs, Modal, Form, Input, Select, Tree } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface Permission {
  id: string
  code: string
  name: string
  type: 'menu' | 'action' | 'api'
  description: string
  status: 'active' | 'inactive'
}

const mockPermissions: Permission[] = [
  {
    id: '1',
    code: 'EMPLOYEE_VIEW',
    name: '查看员工',
    type: 'menu',
    description: '允许查看员工列表和详情',
    status: 'active',
  },
  {
    id: '2',
    code: 'EMPLOYEE_EDIT',
    name: '编辑员工',
    type: 'action',
    description: '允许编辑员工信息',
    status: 'active',
  },
  {
    id: '3',
    code: 'EMPLOYEE_API',
    name: '员工接口',
    type: 'api',
    description: '员工相关API权限',
    status: 'active',
  },
]

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

export default function PermissionPage() {
  const [activeTab, setActiveTab] = useState('1')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const columns: ColumnsType<Permission> = [
    {
      title: '权限编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          menu: { color: 'blue', text: '菜单' },
          action: { color: 'green', text: '操作' },
          api: { color: 'orange', text: 'API' },
        }
        return <Tag color={typeMap[type as keyof typeof typeMap].color}>
          {typeMap[type as keyof typeof typeMap].text}
        </Tag>
      },
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
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    setIsModalVisible(true)
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

  const items = [
    {
      key: '1',
      label: '权限列表',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增权限
            </Button>
          </div>
          <Table columns={columns} dataSource={mockPermissions} rowKey="id" />
        </>
      ),
    },
    {
      key: '2',
      label: '权限树',
      children: (
        <Tree
          checkable
          defaultExpandAll
          treeData={permissionTree}
        />
      ),
    },
  ]

  return (
    <div>
      <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />

      <Modal
        title="新增权限"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="code"
            label="权限编码"
            rules={[{ required: true, message: '请输入权限编码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="权限名称"
            rules={[{ required: true, message: '请输入权限名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="权限类型"
            rules={[{ required: true, message: '请选择权限类型' }]}
          >
            <Select>
              <Select.Option value="menu">菜单</Select.Option>
              <Select.Option value="action">操作</Select.Option>
              <Select.Option value="api">API</Select.Option>
            </Select>
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
    </div>
  )
} 