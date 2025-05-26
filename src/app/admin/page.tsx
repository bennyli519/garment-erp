'use client'

import AdminLayout from '@/app/admin/components/layout/admin-layout'
import { useSession } from 'next-auth/react'
import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

export default function AdminDashboard() {
  const { data: session } = useSession()

  return (

      <div className="min-h-[calc(100vh-64px)]">
        <Card>
          <Title level={2}>欢迎来到管理后台</Title>
          <Paragraph>
            您好，{session?.user?.name || session?.user?.email}！
          </Paragraph>
          <Paragraph>
            当前用户信息：
            <ul>
              <li>邮箱：{session?.user?.email}</li>
              <li>角色ID：{session?.user?.roleId}</li>
              <li>租户ID：{session?.user?.tenantId}</li>
              <li>部门ID：{session?.user?.departmentId}</li>
            </ul>
          </Paragraph>
        </Card>
      </div>

  )
} 