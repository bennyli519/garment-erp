import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserPermissions } from '@/app/admin/utils/permissions'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const permissions = await getUserPermissions(session.user.id)
    
    return NextResponse.json({ permissions })
  } catch (error) {
    console.error('Get user permissions error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 