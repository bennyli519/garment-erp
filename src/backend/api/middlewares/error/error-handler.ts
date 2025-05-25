import { NextResponse } from 'next/server'
import { AppError } from '@/backend/shared/errors/app-error'

export function errorHandler(error: unknown) {
  console.error('Error:', error)

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details
        }
      },
      { status: error.statusCode }
    )
  }

  // 处理未知错误
  return NextResponse.json(
    {
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR'
      }
    },
    { status: 500 }
  )
} 