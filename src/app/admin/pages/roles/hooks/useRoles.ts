import { useState, useEffect } from 'react'
import { message } from 'antd'
import { Role, CreateRoleDto, UpdateRoleDto } from '@/backend/types/role.types'
import { fetchRoles as fetchRolesApi, createRole as createRoleApi, updateRole as updateRoleApi, deleteRole as deleteRoleApi } from '../actions'

export default function useRoles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRoles = async (tenantId?: string | null) => {
    setLoading(true)
    try {
      const data = await fetchRolesApi(tenantId)
      setRoles(data)
    } catch (error: any) {
      message.error('获取角色列表失败: ' + (error.message || '未知错误'))
    } finally {
      setLoading(false)
    }
  }

  const createRole = async (values: CreateRoleDto) => {
    try {
      await createRoleApi(values)
      message.success('角色创建成功')
      await fetchRoles()
      return true
    } catch (error: any) {
      message.error('创建角色失败: ' + (error.message || '未知错误'))
      return false
    }
  }

  const updateRole = async (id: string, values: UpdateRoleDto) => {
    try {
      await updateRoleApi(id, values)
      message.success('角色更新成功')
      await fetchRoles()
      return true
    } catch (error: any) {
      message.error('更新角色失败: ' + (error.message || '未知错误'))
      return false
    }
  }

  const deleteRole = async (id: string) => {
    try {
      await deleteRoleApi(id)
      message.success('角色删除成功')
      await fetchRoles()
      return true
    } catch (error: any) {
      message.error('删除角色失败: ' + (error.message || '未知错误'))
      return false
    }
  }

  useEffect(() => { fetchRoles() }, [])

  return { roles, loading, fetchRoles, createRole, updateRole, deleteRole }
} 