'use client'

import React from 'react'
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/app/admin/data/permissions'
import { useSession } from 'next-auth/react'

interface PermissionControlProps {
  permission?: string
  permissions?: string[]
  requireAll?: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Permission Control Component
 * @param permission Single permission code
 * @param permissions Multiple permission codes
 * @param requireAll Whether all permissions are required
 * @param children Child components
 * @param fallback Fallback content when no permission
 */
export function PermissionControl({
  permission,
  permissions,
  requireAll = false,
  children,
  fallback = null,
}: PermissionControlProps) {
  const { data: session } = useSession()
  const userPermissions = session?.user?.permissions || []

  // Check permissions
  const checkPermission = (): boolean => {
    if (permission) {
      return hasPermission(userPermissions, permission)
    }

    if (permissions) {
      return requireAll
        ? hasAllPermissions(userPermissions, permissions)
        : hasAnyPermission(userPermissions, permissions)
    }

    return false
  }

  return checkPermission() ? <>{children}</> : <>{fallback}</>
}

/**
 * Permission Button Component
 */
interface PermissionButtonProps extends PermissionControlProps {
  onClick: () => void
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

export function PermissionButton({
  permission,
  permissions,
  requireAll,
  children,
  onClick,
  buttonProps,
}: PermissionButtonProps) {
  return (
    <PermissionControl
      permission={permission}
      permissions={permissions}
      requireAll={requireAll}
    >
      <button
        {...buttonProps}
        onClick={onClick}
      >
        {children}
      </button>
    </PermissionControl>
  )
}

/**
 * Permission Route Component
 */
interface PermissionRouteProps extends PermissionControlProps {
  redirect?: string
}

export function PermissionRoute({
  permission,
  permissions,
  requireAll,
  children,
  redirect = '/unauthorized',
}: PermissionRouteProps) {
  const { data: session, status } = useSession()
  const userPermissions = session?.user?.permissions || []

  // Check permissions
  const checkPermission = (): boolean => {
    if (permission) {
      return hasPermission(userPermissions, permission)
    }

    if (permissions) {
      return requireAll
        ? hasAllPermissions(userPermissions, permissions)
        : hasAnyPermission(userPermissions, permissions)
    }

    return false
  }

  // Return null if session is loading
  if (status === 'loading') {
    return null
  }

  // Redirect if no permission
  if (!checkPermission()) {
    window.location.href = redirect
    return null
  }

  return <>{children}</>
} 