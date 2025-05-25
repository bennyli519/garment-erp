'use client'

import { Card, Typography, Button } from 'antd'
import { useRouter } from 'next/navigation'

const { Title, Text } = Typography

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5'
    }}>
      <Card style={{ width: 400, textAlign: 'center' }}>
        <Title level={2} style={{ color: '#ff4d4f' }}>访问被拒绝</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
          您没有权限访问此页面
        </Text>
        <Button type="primary" onClick={() => router.push('/auth/login')}>
          返回登录
        </Button>
      </Card>
    </div>
  )
} 