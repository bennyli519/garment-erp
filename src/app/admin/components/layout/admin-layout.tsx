'use client'

import { useState, useEffect } from 'react'
import { Layout, Menu, Tabs, theme, Typography, Breadcrumb } from 'antd'
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
} from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'
import type { MenuProps } from 'antd'

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

const menuItems: MenuItem[] = [
  {
    key: 'platform-overview',
    icon: <DashboardOutlined />,
    label: '平台概览',
    children: [
      {
        key: 'system-statistics',
        icon: <BarChartOutlined />,
        label: '系统统计',
        path: '/admin/statistics',
      },
      {
        key: 'active-companies',
        icon: <BankOutlined />,
        label: '活跃企业',
        path: '/admin/active-companies',
      },
    ],
  },
  {
    key: 'company-management',
    icon: <BankOutlined />,
    label: '企业管理',
    children: [
      {
        key: 'company-list',
        icon: <UnorderedListOutlined />,
        label: '企业列表',
        path: '/admin/companies',
      },
      {
        key: 'company-approval',
        icon: <AuditOutlined />,
        label: '企业审核',
        path: '/admin/company-approval',
      },
    ],
  },
  {
    key: 'system-management',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      {
        key: 'employee-management',
        icon: <TeamOutlined />,
        label: '员工档案管理',
        children: [
          {
            key: 'employee-info',
            icon: <IdcardOutlined />,
            label: '员工信息维护',
            path: '/admin/employees',
          },
          {
            key: 'department-management',
            icon: <UsergroupAddOutlined />,
            label: '部门管理',
            children: [
              {
                key: 'department-structure',
                icon: <SisternodeOutlined />,
                label: '部门结构设置',
                path: '/admin/departments/structure',
              },
              {
                key: 'department-staff',
                icon: <TeamOutlined />,
                label: '部门人员管理',
                path: '/admin/departments/staff',
              },
            ],
          },
        ],
      },
      {
        key: 'permission-management',
        icon: <SafetyCertificateOutlined />,
        label: '权限管理',
        children: [
          {
            key: 'role-management',
            icon: <ProfileOutlined />,
            label: '角色管理',
            path: '/admin/roles',
          },
          {
            key: 'permission-settings',
            icon: <ToolOutlined />,
            label: '权限设置',
            path: '/admin/permissions',
          },
        ],
      },
    ],
  },
  {
    key: 'basic-data',
    icon: <DatabaseOutlined />,
    label: '基础资料',
    children: [
      {
        key: 'process-management',
        icon: <ExperimentOutlined />,
        label: '工序管理',
        children: [
          {
            key: 'process-categories',
            icon: <AppstoreOutlined />,
            label: '工序分类',
            path: '/admin/process/categories',
          },
          {
            key: 'process-definition',
            icon: <ProfileOutlined />,
            label: '工序定义',
            path: '/admin/process/definition',
          },
          {
            key: 'process-price',
            icon: <PayCircleOutlined />,
            label: '工序工价设置',
            path: '/admin/process/price',
          },
        ],
      },
      {
        key: 'size-management',
        icon: <ColumnHeightOutlined />,
        label: '尺码管理',
        children: [
          {
            key: 'size-group',
            icon: <AppstoreOutlined />,
            label: '尺码组设置',
            path: '/admin/size/groups',
          },
          {
            key: 'size-spec',
            icon: <ProfileOutlined />,
            label: '尺码规格定义',
            path: '/admin/size/specs',
          },
        ],
      },
    ],
  },
  {
    key: 'production-management',
    icon: <BuildOutlined />,
    label: '生产管理',
    children: [
      {
        key: 'style-management',
        icon: <SkinOutlined />,
        label: '款式管理',
        children: [
          {
            key: 'style-info',
            icon: <ProfileOutlined />,
            label: '款式信息维护',
            path: '/admin/styles/info',
          },
          {
            key: 'style-process',
            icon: <FileTextOutlined />,
            label: '款式工艺要求',
            path: '/admin/styles/process',
          },
        ],
      },
      {
        key: 'process-sheet',
        icon: <FileTextOutlined />,
        label: '工艺管理',
        children: [
          {
            key: 'sheet-generation',
            icon: <FileAddOutlined />,
            label: '工艺单生成',
            children: [
              {
                key: 'process-config',
                icon: <ToolOutlined />,
                label: '工序配置',
                path: '/admin/process-sheet/config',
              },
              {
                key: 'tech-requirements',
                icon: <ProfileOutlined />,
                label: '工艺要求设置',
                path: '/admin/process-sheet/requirements',
              },
            ],
          },
          {
            key: 'sheet-list',
            icon: <UnorderedListOutlined />,
            label: '工艺单列表',
            children: [
              {
                key: 'sheet-query',
                icon: <SearchOutlined />,
                label: '工艺单查询',
                path: '/admin/process-sheet/query',
              },
              {
                key: 'sheet-approval',
                icon: <AuditOutlined />,
                label: '工艺单审核',
                path: '/admin/process-sheet/approval',
              },
            ],
          },
        ],
      },
    ],
  },
]

interface Tab {
  key: string
  label: string
  path: string
}

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
const convertMenuItems = (items: MenuItem[]): MenuProps['items'] => {
  return items.map(item => {
    const menuItem: any = {
      key: item.key,
      icon: item.icon,
      label: item.label,
    }

    if (item.children) {
      menuItem.children = convertMenuItems(item.children)
    } else {
      menuItem.onClick = () => handleMenuClick(item)
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
  const [activeTab, setActiveTab] = useState('')
  const [tabs, setTabs] = useState<Tab[]>([])
  const [collapsed, setCollapsed] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState<MenuItem[]>([])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleMenuClick = (item: MenuItem) => {
    if (!item.path) return
    
    // 如果标签不存在，添加新标签
    if (!tabs.find(tab => tab.key === item.key)) {
      setTabs(prev => [...prev, {
        key: item.key,
        label: item.label,
        path: item.path,
      }])
    }
    setActiveTab(item.key)
    router.push(item.path)
  }

  // 根据当前路径设置活动标签
  useEffect(() => {
    // 递归查找当前路径对应的菜单项
    const currentMenuItem = findMenuItem(menuItems, pathname)
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
    const path = findBreadcrumbPath(menuItems, pathname)
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={value => setCollapsed(value)}
        theme="light"
      >
        <div 
          style={{ 
            height: 64, 
            margin: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'transparent'
          }}
        >
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
          items={convertMenuItems(menuItems)}
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