import { useQuery } from '@tanstack/react-query'

interface Module {
  id: string
  code: string
  name: string
  icon: string
  sort: number
  path?: string
}

interface Permission {
  id: string
  code: string
  name: string
  type: string
  path?: string
  moduleId: string
}

interface PermissionResponse {
  permissions: Permission[]
  modules: Module[]
}

export function useUserPermissions() {
  return useQuery<PermissionResponse>({
    queryKey: ['userPermissions'],
    queryFn: async () => {
      const response = await fetch('/api/admin/user/permissions')
      if (!response.ok) {
        throw new Error('Failed to fetch user permissions')
      }
      return response.json()
    }
  })
} 