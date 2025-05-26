'use client'

import { useState, useEffect } from 'react'
import { Layout, Menu, Tabs, theme, Typography, Breadcrumb, Button, Dropdown } from 'antd'
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  BankOutlined,
  AuditOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
  SafetyCertificateOutlined,
  ProfileOutlined,
  ToolOutlined,
  SisternodeOutlined,
  ColumnHeightOutlined,
  ExperimentOutlined,
  SkinOutlined,
  FileTextOutlined,
  BuildOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  PayCircleOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  BarChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'
import type { MenuProps } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import { usePermissions } from '../../hooks/usePermissions'


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

const menuItems: MenuItem[] = [
  {
    key: 'system-management',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      {
        key: 'tenant-management',
        icon: <BankOutlined />,
        label: '租户管理',
        path: '/admin/pages/tenants',
      },
      {
        key: 'user-management',
        icon: <UserOutlined />,
        label: '用户管理',
        path: '/admin/pages/users',
      },
      {
        key: 'employee-info',
        icon: <TeamOutlined />,
        label: '员工档案管理',
        path: '/admin/pages/employees',
      },
      {
        key: 'permission-management',
        icon: <SafetyCertificateOutlined />,
        label: '权限管理',
        path: '/admin/pages/permissions',
      },
      {
        key: 'role-management',
        icon: <ProfileOutlined />,
        label: '角色管理',
        path: '/admin/pages/roles',
      },
    ],
  },
  {
    key: 'production-management',
    icon: <BuildOutlined />,
    label: '生产管理',
    children: [
      {
        key: 'production-order',
        icon: <FileTextOutlined />,
        label: '生产单管理',
        path: '/admin/pages/production/orders',
      },
      {
        key: 'production-process',
        icon: <ExperimentOutlined />,
        label: '生产工序',
        path: '/admin/pages/production/process',
      },
    ],
  },
]

// 递归查找菜单项
const findMenuItem = (items: MenuItem[], path: string): MenuItem | null => {
  for (const item of items) {
    if (item.path === path) return item
    if (item.children) {
      const found = findMenuItem(item.children, path)
      if (found) return found
    }
  }
  return null
}

// 递归将菜单项转换为 Antd Menu 需要的格式
const convertMenuItems = (
  items: MenuItem[],
  router: ReturnType<typeof useRouter>,
  tabs: Tab[],
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>,
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
): MenuProps['items'] => {
  return items.map(item => {
    const menuItem: any = {
      key: item.key,
      icon: item.icon,
      label: item.label,
    }

    if (item.children) {
      menuItem.children = convertMenuItems(item.children, router, tabs, setTabs, setActiveTab)
    } else if (item.path) {
      menuItem.onClick = () => {
        if (item.path) {
          router.push(item.path)
          // 如果标签不存在，添加新标签
          if (!tabs.find((tab: Tab) => tab.key === item.key)) {
            setTabs(prev => [...prev, {
              key: item.key,
              label: item.label,
              path: item.path as string,
            }])
          }
          setActiveTab(item.key)
        }
      }
    }

    return menuItem
  })
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
  const { hasPermission, isAdmin } = usePermissions()
  const [activeTab, setActiveTab] = useState('')
  const [tabs, setTabs] = useState<Tab[]>([])
  const [collapsed, setCollapsed] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState<MenuItem[]>([])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // 根据权限过滤菜单项
  const filterMenuByPermissions = (items: MenuItem[]): MenuItem[] => {
    return items.filter(item => {
      // 如果是管理员，显示所有菜单
      if (isAdmin) return true
      
      // 根据菜单项的 key 检查权限
      if (item.key === 'system-management') {
        return hasPermission('system:tenant:view') ||
               hasPermission('system:user:view') ||
               hasPermission('system:employee:view') || 
               hasPermission('system:permission:view') || 
               hasPermission('system:role:view')
      }
      
      if (item.key === 'production-management') {
        return hasPermission('production:order:view') || 
               hasPermission('production:process:view')
      }
      
      // 对于子菜单项
      if (item.key === 'tenant-management') {
        return hasPermission('system:tenant:view')
      }
      
      if (item.key === 'user-management') {
        return hasPermission('system:user:view')
      }
      
      if (item.key === 'employee-info') {
        return hasPermission('system:employee:view')
      }
      
      if (item.key === 'permission-management') {
        return hasPermission('system:permission:view')
      }
      
      if (item.key === 'role-management') {
        return hasPermission('system:role:view')
      }
      
      if (item.key === 'production-order') {
        return hasPermission('production:order:view')
      }
      
      if (item.key === 'production-process') {
        return hasPermission('production:process:view')
      }
      
      return true
    }).map(item => ({
      ...item,
      children: item.children ? filterMenuByPermissions(item.children) : undefined
    }))
  }

  const filteredMenuItems = filterMenuByPermissions(menuItems)

  // 根据当前路径设置活动标签
  useEffect(() => {
    // 递归查找当前路径对应的菜单项
    const currentMenuItem = findMenuItem(filteredMenuItems, pathname)
    if (currentMenuItem && !tabs.find(tab => tab.key === currentMenuItem.key)) {
      setTabs(prev => [...prev, {
        key: currentMenuItem.key,
        label: currentMenuItem.label,
        path: pathname,
      }])
    }
    if (currentMenuItem) {
      setActiveTab(currentMenuItem.key)
    }
  }, [pathname])

  // 更新面包屑
  useEffect(() => {
    const path = findBreadcrumbPath(filteredMenuItems, pathname)
    setBreadcrumbs(path)
  }, [pathname])

  const handleTabChange = (key: string) => {
    const tab = tabs.find(t => t.key === key)
    if (tab) {
      setActiveTab(key)
      router.push(tab.path)
    }
  }

  const handleTabEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove' && typeof targetKey === 'string') {
      const newTabs = tabs.filter(tab => tab.key !== targetKey)
      setTabs(newTabs)
      
      if (activeTab === targetKey) {
        // 如果关闭的是当前标签，切换到最后一个标签
        const lastTab = newTabs[newTabs.length - 1]
        if (lastTab) {
          setActiveTab(lastTab.key)
          router.push(lastTab.path)
        }
      }
    }
  }

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={value => setCollapsed(value)}
        theme="light"
      >
        <div style={{ height: 64, margin: '16px', background: 'transparent' }}>
          {!collapsed ? (
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              Garment ERP
            </Title>
          ) : (
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              G
            </Title>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeTab]}
          items={convertMenuItems(filteredMenuItems, router, tabs, setTabs, setActiveTab)}
        />
      </Sider>
      <Layout>
        <Header 
          style={{ 
            padding: '0 16px', 
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
          }}
        >
          <Breadcrumb
            items={breadcrumbs.map(item => ({
              title: item.path ? (
                <a onClick={() => router.push(item.path!)}>{item.label}</a>
              ) : (
                item.label
              ),
            }))}
          />
          <div style={{ flex: 1 }} />
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