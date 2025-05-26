export const modulePermissions = [
  {
    id: '1',
    name: '系统管理',
    code: 'system',
    icon: 'SettingOutlined',
    status: 'active',
    sort: 100,
    functions: [
      {
        id: '1-1',
        name: '用户管理',
        code: 'system:users',
        path: '/admin/users',
        actions: [
          {
            id: '1-1-1',
            name: '创建用户',
            code: 'system:users:create'
          },
          {
            id: '1-1-2',
            name: '编辑用户',
            code: 'system:users:edit'
          },
          {
            id: '1-1-3',
            name: '删除用户',
            code: 'system:users:delete'
          }
        ]
      },
      {
        id: '1-2',
        name: '角色管理',
        code: 'system:roles',
        path: '/admin/roles',
        actions: [
          {
            id: '1-2-1',
            name: '创建角色',
            code: 'system:roles:create'
          },
          {
            id: '1-2-2',
            name: '编辑角色',
            code: 'system:roles:edit'
          },
          {
            id: '1-2-3',
            name: '删除角色',
            code: 'system:roles:delete'
          }
        ]
      },
      {
        id: '1-3',
        name: '权限管理',
        code: 'system:permissions',
        path: '/admin/permissions',
        actions: [
          {
            id: '1-3-1',
            name: '分配权限',
            code: 'system:permissions:assign'
          },
          {
            id: '1-3-2',
            name: '撤销权限',
            code: 'system:permissions:revoke'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '组织架构',
    code: 'organization',
    icon: 'TeamOutlined',
    status: 'active',
    sort: 90,
    functions: [
      {
        id: '2-1',
        name: '部门管理',
        code: 'organization:departments',
        path: '/admin/departments',
        actions: [
          {
            id: '2-1-1',
            name: '创建部门',
            code: 'organization:departments:create'
          },
          {
            id: '2-1-2',
            name: '编辑部门',
            code: 'organization:departments:edit'
          },
          {
            id: '2-1-3',
            name: '删除部门',
            code: 'organization:departments:delete'
          }
        ]
      },
      {
        id: '2-2',
        name: '员工管理',
        code: 'organization:employees',
        path: '/admin/employees',
        actions: [
          {
            id: '2-2-1',
            name: '创建员工',
            code: 'organization:employees:create'
          },
          {
            id: '2-2-2',
            name: '编辑员工',
            code: 'organization:employees:edit'
          },
          {
            id: '2-2-3',
            name: '删除员工',
            code: 'organization:employees:delete'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: '生产管理',
    code: 'production',
    icon: 'BuildOutlined',
    status: 'active',
    sort: 80,
    functions: [
      {
        id: '3-1',
        name: '生产单管理',
        code: 'production:orders',
        path: '/admin/production/orders',
        actions: [
          {
            id: '3-1-1',
            name: '创建生产单',
            code: 'production:orders:create'
          },
          {
            id: '3-1-2',
            name: '编辑生产单',
            code: 'production:orders:edit'
          },
          {
            id: '3-1-3',
            name: '删除生产单',
            code: 'production:orders:delete'
          }
        ]
      },
      {
        id: '3-2',
        name: '工序管理',
        code: 'production:process',
        path: '/admin/production/process',
        actions: [
          {
            id: '3-2-1',
            name: '创建工序',
            code: 'production:process:create'
          },
          {
            id: '3-2-2',
            name: '编辑工序',
            code: 'production:process:edit'
          },
          {
            id: '3-2-3',
            name: '删除工序',
            code: 'production:process:delete'
          }
        ]
      }
    ]
  }
] 