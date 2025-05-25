// Permission Types
export type PermissionType = 'module' | 'function' | 'action'

// Base Permission Interface
interface BasePermission {
  id: string
  code: string
  name: string
  type: PermissionType
  status: 'active' | 'inactive'
}

// Action Permission
export interface ActionPermission extends BasePermission {
  type: 'action'
  functionId: string  // Parent function ID
}

// Function Permission
export interface FunctionPermission extends BasePermission {
  type: 'function'
  moduleId: string    // Parent module ID
  path?: string      // Route path
  icon?: string      // Icon name
  sort: number       // Sort order
  actions: ActionPermission[]
}

// Module Permission
export interface ModulePermission extends BasePermission {
  type: 'module'
  sort: number       // Sort order
  icon?: string      // Icon name
  functions: FunctionPermission[]
}

// Permission Tree Node (for tree display)
export interface PermissionTreeNode {
  key: string        // Usually permission code
  title: string      // Display name
  type: PermissionType
  icon?: string
  children?: PermissionTreeNode[]
}

// Role Permission Association
export interface RolePermission {
  roleId: string
  permissionCode: string
  type: PermissionType
} 