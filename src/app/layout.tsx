import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SessionProvider } from '@/app/admin/providers/session-provider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garment ERP",
  description: "Enterprise Resource Planning System for Garment Industry",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AntdRegistry>
          <SessionProvider session={session}>
            <ConfigProvider
              locale={zhCN}
              theme={{
                token: {
                  colorPrimary: '#1677ff',
                },
              }}
            >
              {children}
            </ConfigProvider>
          </SessionProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
