'use client'

import { useState } from 'react'
import { Layout, Menu, Tabs, theme, Typography, Button, Dropdown } from 'antd'
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'
import type { MenuProps } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import { useUserPermissions } from '../../hooks/useUserPermissions'

const { Header, Sider, Content } = Layout
const { TabPane } = Tabs
const { Title } = Typography

interface MenuItem {
  key: string
  icon?: React.ReactNode
  label: string
  path?: string
  children?: MenuItem[]
}

interface Tab {
  key: string
  label: string
  path: string
}

interface Module {
  id: string
  code: string
  name: string
  icon: string
  sort: number
}

interface Permission {
  moduleId: string
  type: string
  code: string
  name: string
  path?: string
}

// 图标映射
const iconMap: { [key: string]: React.ReactNode } = {
  'SettingOutlined': <SettingOutlined />,
  'TeamOutlined': <TeamOutlined />,
  'UserOutlined': <UserOutlined />,
}

// 添加获取面包屑路径的辅助函数
const findBreadcrumbPath = (items: MenuItem[], targetPath: string): MenuItem[] => {
  for (const item of items) {
    if (item.path === targetPath) {
      return [item]
    }
    if (item.children) {
      const path = findBreadcrumbPath(item.children, targetPath)
      if (path.length) {
        return [item, ...path]
      }
    }
  }
  return []
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const { data: permissionData, isLoading } = useUserPermissions()
  const [activeTab, setActiveTab] = useState('')
  const [tabs, setTabs] = useState<Tab[]>([])
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // 根据权限数据生成菜单项
  const generateMenuItems = (): MenuItem[] => {
    if (!permissionData?.modules || !permissionData?.permissions) {
      return []
    }

    const moduleMap = new Map(
      (permissionData.modules as Module[]).map(module => [module.id, module])
    )

    const menuItemsByModule = new Map<string, MenuItem>()

    // 处理页面类型的权限
    ;(permissionData.permissions as Permission[])
      .filter(permission => permission.type === 'page')
      .forEach(permission => {
        const module = moduleMap.get(permission.moduleId)
        if (!module) return

        let menuItem = menuItemsByModule.get(module.id)
        if (!menuItem) {
          menuItem = {
            key: module.code,
            icon: iconMap[module.icon] || <AppstoreOutlined />,
            label: module.name,
            children: []
          }
          menuItemsByModule.set(module.id, menuItem)
        }

        if (permission.path) {
          // 确保路径格式正确
          const path = permission.path.startsWith('/admin/pages/') 
            ? permission.path 
            : `/admin/pages${permission.path.startsWith('/') ? permission.path : `/${permission.path}`}`
    
          menuItem.children?.push({
            key: permission.code,
            label: permission.name,
            path: path
          })
        }
      })

    // 按模块的 sort 排序
    const sortedItems = Array.from(menuItemsByModule.values())
      .sort((a, b) => {
        const moduleA = permissionData.modules.find(m => m.code === a.key)
        const moduleB = permissionData.modules.find(m => m.code === b.key)
        return ((moduleB?.sort || 0) - (moduleA?.sort || 0))
      })

    return sortedItems
  }

  const menuItems = generateMenuItems()

  // 用户菜单项
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: session?.user?.name || session?.user?.email,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => signOut({ callbackUrl: '/auth/login' }),
    },
  ]

  // 处理菜单点击
  const handleMenuClick = ({ key, keyPath }: { key: string, keyPath: string[] }) => {
    // 找到对应的菜单项
    const findItem = (items: any[], targetKey: string): any => {
      for (const item of items) {
        if (item.key === targetKey) return item
        if (item.children) {
          const found = findItem(item.children, targetKey)
          if (found) return found
        }
      }
      return null
    }

    const clickedItem = findItem(menuItems, key)
    if (!clickedItem?.path) return

    console.log('Menu clicked:', { key, path: clickedItem.path })

    // 更新标签页
    const newTab = {
      key: clickedItem.key,
      label: clickedItem.label,
      path: clickedItem.path
    }

    setTabs(prev => {
      const existingTabIndex = prev.findIndex(tab => tab.key === clickedItem.key)
      if (existingTabIndex === -1) {
        return [...prev, newTab]
      }
      return prev
    })

    setActiveTab(clickedItem.key)
    console.log('Navigating to:', clickedItem.path)
    router.push(clickedItem.path)
  }

  // 处理标签页切换
  const handleTabChange = (key: string) => {
    const tab = tabs.find(t => t.key === key)
    if (tab) {
      setActiveTab(key)
      router.push(tab.path)
    }
  }

  // 处理标签页关闭
  const handleTabEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove' && typeof targetKey === 'string') {
      const newTabs = tabs.filter(tab => tab.key !== targetKey)
      if (newTabs.length && activeTab === targetKey) {
        const lastTab = newTabs[newTabs.length - 1]
        setActiveTab(lastTab.key)
        router.push(lastTab.path)
      }
      setTabs(newTabs)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="light"
      >
        <div style={{ height: 64, margin: '16px', background: 'transparent' }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            {collapsed ? 'G' : 'Garment ERP'}
          </Title>
        </div>
        {isLoading ? (
          <div style={{ padding: 24, textAlign: 'center' }}>Loading...</div>
        ) : (
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[activeTab]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        )}
      </Sider>
      <Layout>
        <Header 
          style={{ 
            padding: '0 16px', 
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" icon={<UserOutlined />}>
              {session?.user?.name || session?.user?.email || '用户'}
            </Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Tabs
            activeKey={activeTab}
            type="editable-card"
            onChange={handleTabChange}
            onEdit={handleTabEdit}
            hideAdd
            style={{ 
              background: colorBgContainer,
              padding: '8px 8px 0',
              marginBottom: 8,
              borderRadius: borderRadiusLG,
            }}
          >
            {tabs.map(tab => (
              <TabPane
                key={tab.key}
                tab={tab.label}
                closable={tabs.length > 1}
              />
            ))}
          </Tabs>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
} 