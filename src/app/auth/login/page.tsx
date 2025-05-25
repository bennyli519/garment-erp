'use client'

import { Card, Typography } from 'antd'

import styles from './login.module.css'
import { LoginForm } from './login-form'

const { Title, Text } = Typography

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Card className={styles.card}>
          <div className={styles.header}>
            <Title level={2}>登录</Title>
            <Text type="secondary">登录到服装ERP系统</Text>
          </div>
          <LoginForm />
        </Card>
      </div>
      <div className={styles.background}>
        <div className={styles.brandingText}>
          <Title level={2} style={{ color: '#fff', marginBottom: 24 }}>
            服装ERP系统
          </Title>
          <Text style={{ color: '#fff', fontSize: 16 }}>
            高效的服装企业资源管理系统，助力企业数字化转型
          </Text>
        </div>
      </div>
    </div>
  )
} 