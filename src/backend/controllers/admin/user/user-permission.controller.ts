import { NextRequest, NextResponse } from 'next/server'
import { UserPermissionService } from '@/backend/services/user-permission.service'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export class UserPermissionController {
  static async list(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions)
      console.log('Session:', JSON.stringify(session, null, 2))
      
      if (!session?.user?.id) {
        console.log('No user ID in session')
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      console.log('Fetching permissions for user:', session.user.id)
      const result = await UserPermissionService.getUserPermissions(session.user.id)
      console.log('Fetched permissions:', result)
      
      return NextResponse.json(result)
    } catch (error) {
      console.error('List user permissions error:', error)
      if (error instanceof Error) {
        console.error('Error details:', error.message)
        console.error('Error stack:', error.stack)
      }
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  static async assign(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const { userId, permissionIds } = await req.json()
      
      if (!userId || !Array.isArray(permissionIds)) {
        return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
      }

      const result = await UserPermissionService.assignPermissions(userId, permissionIds)
      return NextResponse.json(result, { status: 201 })
    } catch (error) {
      console.error('Assign permissions error:', error)
      
      if (error instanceof Error) {
        if (error.message === 'User not found') {
          return NextResponse.json({ error: error.message }, { status: 404 })
        }
        if (error.message === 'Invalid permissions') {
          return NextResponse.json({ error: error.message }, { status: 400 })
        }
      }
      
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }

  static async revoke(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      const { userId, permissionIds } = await req.json()
      
      if (!userId || !Array.isArray(permissionIds)) {
        return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
      }

      await UserPermissionService.revokePermissions(userId, permissionIds)
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Revoke permissions error:', error)
      
      if (error instanceof Error) {
        if (error.message === 'User not found') {
          return NextResponse.json({ error: error.message }, { status: 404 })
        }
      }
      
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
} 