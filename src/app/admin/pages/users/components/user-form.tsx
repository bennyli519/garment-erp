'use client'

import { Form, Input, Select, Button, Space } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'

const { Option } = Select

interface UserFormProps {
  initialValues?: {
    name: string
    email: string
    role: string
  }
  onSubmit: (values: any) => void
  onCancel: () => void
}

export function UserForm({ initialValues, onSubmit, onCancel }: UserFormProps) {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="请输入用户名" 
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input 
          prefix={<MailOutlined />} 
          placeholder="请输入邮箱" 
        />
      </Form.Item>

      <Form.Item
        name="role"
        label="角色"
        rules={[{ required: true, message: '请选择角色' }]}
      >
        <Select placeholder="选择角色">
          <Option value="操作员">操作员</Option>
          <Option value="管理员">管理员</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button onClick={onCancel}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
} 