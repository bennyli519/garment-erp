export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string,
    public readonly details?: unknown
  ) {
    super(message)
    this.name = this.constructor.name
  }

  static badRequest(message: string, details?: unknown): AppError {
    return new AppError(message, 400, 'BAD_REQUEST', details)
  }

  static unauthorized(message: string = 'Unauthorized'): AppError {
    return new AppError(message, 401, 'UNAUTHORIZED')
  }

  static forbidden(message: string = 'Forbidden'): AppError {
    return new AppError(message, 403, 'FORBIDDEN')
  }

  static notFound(message: string = 'Not Found'): AppError {
    return new AppError(message, 404, 'NOT_FOUND')
  }
} 