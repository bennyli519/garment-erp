'use client'

import { useEffect } from 'react';
import { Form, Input, Select, Button, Space, Alert } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import type { Role } from '@/backend/types/role.types';
import type { CreateUserDto, UpdateUserDto, User } from '@/backend/types/user.types';

const { Option } = Select;

interface UserFormProps {
  initialValues?: Partial<User> & { password?: string }; // User to edit, password can be empty for edit
  roles: Role[];
  tenantId?: string; // Optional: if a specific tenant is pre-selected for new users
  onSubmit: (values: CreateUserDto | UpdateUserDto) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  formError?: string | null;
}

export function UserForm({
  initialValues,
  roles,
  tenantId,
  onSubmit,
  onCancel,
  isSubmitting,
  formError
}: UserFormProps) {
  const [form] = Form.useForm();
  const isEditing = !!initialValues?.id;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        // roleId: initialValues.roleId, // Ensure this is part of initialValues if editing
      });
    } else {
      form.resetFields();
      if (tenantId) {
        form.setFieldsValue({ tenantId }); // Pre-fill tenantId if provided for new users
      }
    }
  }, [initialValues, form, tenantId]);

  const handleSubmit = (values: any) => {
    const submissionData = { ...values };
    if (!isEditing && !submissionData.tenantId && tenantId) {
        submissionData.tenantId = tenantId; // Ensure tenantId is included if passed as prop
    }
    onSubmit(submissionData as CreateUserDto | UpdateUserDto);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      // initialValues is set via useEffect to handle dynamic changes and reset
      onFinish={handleSubmit}
      autoComplete="off"
    >
      {formError && <Form.Item><Alert message={formError} type="error" showIcon /></Form.Item>}
      
      <Form.Item
        name="name"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item
        name="password"
        label={isEditing ? "新密码 (留空则不修改)" : "密码"}
        rules={isEditing ? [] : [{ required: true, message: '请输入密码' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder={isEditing ? "输入新密码" : "请输入密码"} />
      </Form.Item>

      <Form.Item
        name="roleId"
        label="角色"
        rules={[{ required: true, message: '请选择角色' }]}
      >
        <Select placeholder="选择角色" loading={!roles.length} disabled={!roles.length}>
          {roles.map((role) => (
            <Option key={role.id} value={role.id}>
              {role.name} {role.isSystem && "(系统)"}
            </Option>
          ))}
        </Select>
      </Form.Item>
      
      {/* tenantId might be hidden or pre-filled based on context */}
      {/* This example assumes tenantId is handled by UsersPage or passed as prop */}
      {/* If superadmin needs to select tenant for new user: */}
      {!isEditing && !tenantId && (
        <Form.Item
          name="tenantId"
          label="所属租户ID (Tenant ID)"
          rules={[{ required: true, message: '请输入所属租户ID' }]}
        >
          <Input prefix={<IdcardOutlined />} placeholder="输入租户ID" />
        </Form.Item>
      )}

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>
            {isEditing ? '更新用户' : '创建用户'}
          </Button>
          <Button onClick={onCancel} disabled={isSubmitting}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
} 