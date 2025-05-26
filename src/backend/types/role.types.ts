export interface Role {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  isSystem: boolean;
  tenantId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  // permissions?: Permission[]; // Assuming permissions might be loaded separately or via relation
}

export interface CreateRoleDto {
  name: string;
  code: string;
  description?: string | null;
  isSystem?: boolean;
  tenantId?: string | null;     // For tenant-specific roles
  permissionIds?: string[]; // IDs of permissions to assign to this role
}

export interface UpdateRoleDto {
  name?: string;
  code?: string;
  description?: string | null;
  isSystem?: boolean;
  tenantId?: string | null;
  permissionIds?: string[];
} 