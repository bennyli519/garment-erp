'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, Typography, Button } from 'antd'
import { useRouter } from 'next/navigation'

const { Title, Text } = Typography

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')

  let errorMessage = '登录过程中发生错误'
  if (error === 'CredentialsSignin') {
    errorMessage = '邮箱或密码错误'
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5'
    }}>
      <Card style={{ width: 400, textAlign: 'center' }}>
        <Title level={2} style={{ color: '#ff4d4f' }}>登录失败</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
          {errorMessage}
        </Text>
        <Button type="primary" onClick={() => router.push('/auth/login')}>
          返回登录
        </Button>
      </Card>
    </div>
  )
} 