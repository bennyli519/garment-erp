import type { User, CreateUserDto, UpdateUserDto } from '@/backend/types/user.types';
import type { Role } from '@/backend/types/role.types';

const API_BASE_URL = '/api/admin';

// User API Client Functions
export async function fetchUsers(tenantId?: string): Promise<User[]> {
  const queryParams = tenantId ? `?tenantId=${tenantId}` : '';
  const response = await fetch(`${API_BASE_URL}/users${queryParams}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch users');
  }
  return response.json();
}

export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch user');
  }
  return response.json();
}

export async function createUser(userData: CreateUserDto): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }
  return response.json();
}

export async function updateUser(id: string, userData: UpdateUserDto): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user');
  }
  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete user');
  }
  // DELETE might not return a body or return a confirmation message
}

// Role API Client Functions
export async function fetchRoles(tenantId?: string | null): Promise<Role[]> {
  const queryParams = tenantId ? `?tenantId=${tenantId}` : ''; // System roles fetched if tenantId is null/undefined
  const response = await fetch(`${API_BASE_URL}/roles${queryParams}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch roles');
  }
  return response.json();
} 