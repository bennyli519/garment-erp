"use client"

import { useState } from "react"
import { Form, Input, Button, Alert, Space } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

interface LoginFormValues {
  email: string
  password: string
}

const defaultValues = {
  // email: 'admin@example.com',
  email:"admin@system.com",
  password: 'admin123'
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>(() => {
    const errorParam = searchParams.get('error')
    if (errorParam === 'CredentialsSignin') {
      return '邮箱或密码错误'
    }
    return ''
  })
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true)
      setError("")

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: `${window.location.origin}/admin`
      })

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError("邮箱或密码错误")
        } else {
          setError("登录过程中发生错误")
        }
        return
      }
      
      console.log('Login result:', {
        ok: result?.ok,
        url: result?.url,
        error: result?.error,
        status: result?.status
      })

      if (result?.url) {
        router.push(result.url)
      } else {
        router.push("/admin")
      }
      router.refresh()
    } catch (_err) {
      setError("登录过程中发生错误")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      name="login"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
      layout="vertical"
      initialValues={defaultValues}
    >
      {error && (
        <Form.Item>
          <Alert message={error} type="error" showIcon />
        </Form.Item>
      )}

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入有效的邮箱地址" },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="邮箱"
          autoComplete="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "请输入密码" },
          { min: 6, message: "密码至少需要6个字符" },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="密码"
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          登录
        </Button>
      </Form.Item>
{/* 
      <Form.Item style={{ marginBottom: 0, textAlign: "center" }}>
        <Space>
          <Link href="/auth/forgot-password">忘记密码？</Link>
          <Link href="/auth/register">注册账户</Link>
        </Space>
      </Form.Item> */}
    </Form>
  )
} 