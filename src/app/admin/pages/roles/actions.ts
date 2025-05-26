import type { Role, CreateRoleDto, UpdateRoleDto } from '@/backend/types/role.types';

const API_BASE_URL = '/api/admin';

export async function fetchRoles(tenantId?: string | null): Promise<Role[]> {
  const queryParams = tenantId ? `?tenantId=${tenantId}` : ''; 
  const response = await fetch(`${API_BASE_URL}/roles${queryParams}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch roles');
  }
  return response.json();
}

export async function fetchRole(id: string): Promise<Role> {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch role');
  }
  return response.json();
}

export async function createRole(roleData: CreateRoleDto): Promise<Role> {
  const response = await fetch(`${API_BASE_URL}/roles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roleData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create role');
  }
  return response.json();
}

export async function updateRole(id: string, roleData: UpdateRoleDto): Promise<Role> {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roleData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update role');
  }
  return response.json();
}

export async function deleteRole(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete role');
  }
} 