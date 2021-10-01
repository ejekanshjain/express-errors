export default class CustomError extends Error {
  code: string
  statusCode: number

  constructor(message: string, code?: string, statusCode?: number) {
    super(message)
    this.name = 'CustomError'
    this.code = code ?? 'InternalServerError'
    this.statusCode = statusCode ?? 500
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message
    }
  }
}

const useErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.toJSON())
  } else {
    console.error(err)
    res
      .status(500)
      .json({ code: 'InternalServerError', message: 'Something Went Wrong!' })
  }
  next()
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 'BadRequestError', 400)
  }
}

class InvalidCredentialsError extends CustomError {
  constructor(message: string) {
    super(message, 'InvalidCredentialsError', 401)
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, ' UnauthorizedError', 401)
  }
}

class PaymentRequiredError extends CustomError {
  constructor(message: string) {
    super(message, 'PaymentRequiredError', 402)
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 'ForbiddenError', 403)
  }
}

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404)
  }
}

class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 'ConflictError', 409)
  }
}

class TooManyRequestsError extends CustomError {
  constructor(message: string) {
    super(message, 'TooManyRequestsError', 429)
  }
}

class RequestThrottledError extends CustomError {
  constructor(message: string) {
    super(message, 'RequestThrottledError', 429)
  }
}

export {
  CustomError,
  useErrorHandler,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InvalidCredentialsError,
  TooManyRequestsError,
  RequestThrottledError,
  PaymentRequiredError
}
