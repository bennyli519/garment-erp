'use client'

import { useEffect } from 'react'
import { Form, Input, Modal, message } from 'antd'
import useRoles from '../hooks/useRoles'
import type { Role } from '@/backend/types/role.types'

const { TextArea } = Input

interface RoleFormProps {
  visible: boolean
  onClose: () => void
  role: Role | null
  onSuccess: () => void
}

export default function RoleForm({ visible, onClose, role, onSuccess }: RoleFormProps) {
  const [form] = Form.useForm()
  const { createRole, updateRole } = useRoles()

  useEffect(() => {
    if (role) {
      form.setFieldsValue(role)
    } else {
      form.resetFields()
    }
  }, [role, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()

      // 检查必填字段
      if (!values.name || !values.code) {
        message.error('请填写所有必填字段')
        return
      }

      if (role) {
        const success = await updateRole(role.id, values)
        if (success) {
          onSuccess?.()
          onClose()
        }
      } else {
        const success = await createRole(values)
        if (success) {
          onSuccess?.()
          onClose()
        }
      }
    } catch (error: any) {
      // 显示具体的验证错误信息
      if (error.errorFields) {
        const errorMsg = error.errorFields.map((field: any) => field.errors[0]).join(', ')
        message.error(`表单验证失败: ${errorMsg}`)
      } else {
        message.error('操作失败: ' + (error.message || '未知错误'))
      }
      console.error('Form submission error:', error)
    }
  }

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      title={role ? '编辑角色' : '新增角色'}
      okText={role ? '更新' : '创建'}
      cancelText="取消"
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
          <Input placeholder="请输入角色名称" />
        </Form.Item>

        <Form.Item
          name="code"
          label="角色编码"
          rules={[{ required: true, message: '请输入角色编码' }]}
        >
          <Input placeholder="请输入角色编码" />
        </Form.Item>

        <Form.Item
          name="description"
          label="描述"
        >
          <TextArea rows={4} placeholder="请输入角色描述" />
        </Form.Item>

        {/* TODO: Add permission selection */}
        {/* <Form.Item
          name="permissionIds"
          label="权限"
        >
          <Select
            mode="multiple"
            placeholder="请选择权限"
            optionFilterProp="children"
          >
            {permissions.map(permission => (
              <Option key={permission.id} value={permission.id}>
                {permission.name}
              </Option>
            ))}
          </Select>
        </Form.Item> */}
      </Form>
    </Modal>
  )
} 