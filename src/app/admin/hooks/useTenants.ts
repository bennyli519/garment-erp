import { useQuery } from '@tanstack/react-query'

async function fetchTenants() {
  const response = await fetch('/api/admin/tenants')
  if (!response.ok) {
    throw new Error('Failed to fetch tenants')
  }
  return response.json()
}

export function useTenants() {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: fetchTenants
  })
} 