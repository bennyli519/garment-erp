import {
  ModulePermission,
  FunctionPermission,
  ActionPermission,
  PermissionTreeNode
} from '@/app/admin/types/permission.types'
import {
  TeamOutlined,
  SafetyCertificateOutlined,
  ProfileOutlined,
  BuildOutlined,
  FileTextOutlined,
  ExperimentOutlined,
} from '@ant-design/icons'

// System Management Module Permissions
const systemModule: ModulePermission = {
  id: 'system',
  code: 'system',
  name: 'System Management',
  type: 'module',
  status: 'active',
  sort: 1,
  icon: 'SettingOutlined',
  functions: [
    {
      id: 'system:employee',
      code: 'system:employee',
      name: 'Employee Management',
      type: 'function',
      moduleId: 'system',
      status: 'active',
      sort: 1,
      icon: 'TeamOutlined',
      path: '/admin/employees',
      actions: [
        {
          id: 'system:employee:view',
          code: 'system:employee:view',
          name: 'View Employee',
          type: 'action',
          functionId: 'system:employee',
          status: 'active',
        },
        {
          id: 'system:employee:create',
          code: 'system:employee:create',
          name: 'Create Employee',
          type: 'action',
          functionId: 'system:employee',
          status: 'active',
        },
        {
          id: 'system:employee:edit',
          code: 'system:employee:edit',
          name: 'Edit Employee',
          type: 'action',
          functionId: 'system:employee',
          status: 'active',
        },
        {
          id: 'system:employee:delete',
          code: 'system:employee:delete',
          name: 'Delete Employee',
          type: 'action',
          functionId: 'system:employee',
          status: 'active',
        },
      ],
    },
    {
      id: 'system:permission',
      code: 'system:permission',
      name: 'Permission Management',
      type: 'function',
      moduleId: 'system',
      status: 'active',
      sort: 2,
      icon: 'SafetyCertificateOutlined',
      path: '/admin/permissions',
      actions: [
        {
          id: 'system:permission:view',
          code: 'system:permission:view',
          name: 'View Permission',
          type: 'action',
          functionId: 'system:permission',
          status: 'active',
        },
        {
          id: 'system:permission:assign',
          code: 'system:permission:assign',
          name: 'Assign Permission',
          type: 'action',
          functionId: 'system:permission',
          status: 'active',
        },
      ],
    },
    {
      id: 'system:role',
      code: 'system:role',
      name: 'Role Management',
      type: 'function',
      moduleId: 'system',
      status: 'active',
      sort: 3,
      icon: 'ProfileOutlined',
      path: '/admin/roles',
      actions: [
        {
          id: 'system:role:view',
          code: 'system:role:view',
          name: 'View Role',
          type: 'action',
          functionId: 'system:role',
          status: 'active',
        },
        {
          id: 'system:role:create',
          code: 'system:role:create',
          name: 'Create Role',
          type: 'action',
          functionId: 'system:role',
          status: 'active',
        },
        {
          id: 'system:role:edit',
          code: 'system:role:edit',
          name: 'Edit Role',
          type: 'action',
          functionId: 'system:role',
          status: 'active',
        },
        {
          id: 'system:role:delete',
          code: 'system:role:delete',
          name: 'Delete Role',
          type: 'action',
          functionId: 'system:role',
          status: 'active',
        },
      ],
    },
  ],
}

// Production Management Module Permissions
const productionModule: ModulePermission = {
  id: 'production',
  code: 'production',
  name: 'Production Management',
  type: 'module',
  status: 'active',
  sort: 2,
  icon: 'BuildOutlined',
  functions: [
    {
      id: 'production:order',
      code: 'production:order',
      name: 'Production Order',
      type: 'function',
      moduleId: 'production',
      status: 'active',
      sort: 1,
      icon: 'FileTextOutlined',
      path: '/admin/production/orders',
      actions: [
        {
          id: 'production:order:view',
          code: 'production:order:view',
          name: 'View Order',
          type: 'action',
          functionId: 'production:order',
          status: 'active',
        },
        {
          id: 'production:order:create',
          code: 'production:order:create',
          name: 'Create Order',
          type: 'action',
          functionId: 'production:order',
          status: 'active',
        },
        {
          id: 'production:order:edit',
          code: 'production:order:edit',
          name: 'Edit Order',
          type: 'action',
          functionId: 'production:order',
          status: 'active',
        },
        {
          id: 'production:order:delete',
          code: 'production:order:delete',
          name: 'Delete Order',
          type: 'action',
          functionId: 'production:order',
          status: 'active',
        },
      ],
    },
    {
      id: 'production:process',
      code: 'production:process',
      name: 'Production Process',
      type: 'function',
      moduleId: 'production',
      status: 'active',
      sort: 2,
      icon: 'ExperimentOutlined',
      path: '/admin/production/process',
      actions: [
        {
          id: 'production:process:view',
          code: 'production:process:view',
          name: 'View Process',
          type: 'action',
          functionId: 'production:process',
          status: 'active',
        },
        {
          id: 'production:process:create',
          code: 'production:process:create',
          name: 'Create Process',
          type: 'action',
          functionId: 'production:process',
          status: 'active',
        },
        {
          id: 'production:process:edit',
          code: 'production:process:edit',
          name: 'Edit Process',
          type: 'action',
          functionId: 'production:process',
          status: 'active',
        },
        {
          id: 'production:process:delete',
          code: 'production:process:delete',
          name: 'Delete Process',
          type: 'action',
          functionId: 'production:process',
          status: 'active',
        },
      ],
    },
  ],
}

// Export all module permissions
export const modulePermissions: ModulePermission[] = [
  systemModule,
  productionModule,
]

// Utility function: Get all permission codes
export const getAllPermissionCodes = (): string[] => {
  const codes: string[] = []
  
  modulePermissions.forEach(module => {
    codes.push(module.code)
    
    module.functions.forEach(func => {
      codes.push(func.code)
      
      func.actions.forEach(action => {
        codes.push(action.code)
      })
    })
  })
  
  return codes
}

// Utility function: Convert permissions to tree structure
export const convertToPermissionTree = (): PermissionTreeNode[] => {
  return modulePermissions.map(module => ({
    key: module.code,
    title: module.name,
    type: module.type,
    icon: module.icon,
    children: module.functions.map(func => ({
      key: func.code,
      title: func.name,
      type: func.type,
      icon: func.icon,
      children: func.actions.map(action => ({
        key: action.code,
        title: action.name,
        type: action.type,
      })),
    })),
  }))
}

// Utility function: Check if has specific permission
export const hasPermission = (userPermissions: string[], permissionCode: string): boolean => {
  return userPermissions.includes(permissionCode)
}

// Utility function: Check if has any of the permissions
export const hasAnyPermission = (userPermissions: string[], permissionCodes: string[]): boolean => {
  return permissionCodes.some(code => userPermissions.includes(code))
}

// Utility function: Check if has all permissions
export const hasAllPermissions = (userPermissions: string[], permissionCodes: string[]): boolean => {
  return permissionCodes.every(code => userPermissions.includes(code))
} 