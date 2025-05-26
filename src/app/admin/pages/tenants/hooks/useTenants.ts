import { useState, useEffect } from 'react'

export default function useTenants() {
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTenants = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/tenants')
      const data = await res.json()
      setTenants(data)
    } finally {
      setLoading(false)
    }
  }

  const createTenant = async (values) => {
    await fetch('/api/admin/tenants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    fetchTenants()
  }

  const updateTenant = async (id, values) => {
    await fetch(`/api/admin/tenants`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...values })
    })
    fetchTenants()
  }

  useEffect(() => { fetchTenants() }, [])

  return { tenants, loading, fetchTenants, createTenant, updateTenant }
} 