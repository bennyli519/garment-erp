'use client'

import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import AdminLayout from './components/layout/admin-layout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <AdminLayout>{children}</AdminLayout>
    </ConfigProvider>
  )
} 