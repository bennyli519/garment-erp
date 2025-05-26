'use client'

import { useEffect } from 'react'
import { Form, Input, Modal, Select, message } from 'antd'
import useTenants from '../hooks/useTenants'

const { Option } = Select

interface TenantFormProps {
  visible: boolean
  onClose: () => void
  tenant: any
  onSuccess: () => void
}

export default function TenantForm({ visible, onClose, tenant, onSuccess }: TenantFormProps) {
  const [form] = Form.useForm()
  const { createTenant, updateTenant } = useTenants()
  console.log('asdfasdf',tenant)
  useEffect(() => { 
    if (tenant) {
      form.setFieldsValue(tenant)
    } else {
      form.resetFields()
    }
  }, [tenant, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      
      // 检查必填字段
      if (!values.name || !values.code || !values.status) {
        message.error('请填写所有必填字段')
        return
      }

      if (tenant) {
        await updateTenant(tenant.id, values)
        message.success('公司信息已更新')
      } else {
        await createTenant(values)
        message.success('公司已创建')
      }
      onSuccess && onSuccess()
      onClose()
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
      title={tenant ? '编辑公司' : '新增公司'}
      okText={tenant ? '更新' : '创建'}
      cancelText="取消"
    >
      <Form 
        form={form} 
        layout="vertical"
        // validateTrigger={['onChange', 'onBlur']}
      >
        <Form.Item 
          name="name" 
          label="公司名" 
          rules={[{ required: true, message: '请输入公司名' }]}
        >
          <Input placeholder="请输入公司名称" />
        </Form.Item>
        
        <Form.Item 
          name="code" 
          label="编码" 
          rules={[{ required: true, message: '请输入编码' }]}
        >
          <Input placeholder="请输入公司编码" />
        </Form.Item>
        
        <Form.Item 
          name="status" 
          label="状态" 
          rules={[{ required: true, message: '请选择状态' }]}
        >
          <Select placeholder="请选择公司状态">
            <Option value="active">启用</Option>
            <Option value="inactive">禁用</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
} 