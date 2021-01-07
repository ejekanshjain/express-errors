class CustomError extends Error {
    constructor(message = '', code = 'InternalServerError', statusCode = 500) {
        super(message)
        this.name = 'CustomError'
        this.code = code
        this.statusCode = statusCode
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message
        }
    }
}

const useCustomErrorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.toJSON())
    } else {
        console.error(err)
        res.status(500).json({ code: 'InternalServerError', message: 'Something Went Wrong' })
    }
    next()
}

class BadRequestError extends CustomError {
    constructor(message = '') {
        super(message, 'BadRequestError', 400)
    }
}

class UnauthorizedError extends CustomError {
    constructor(message = '') {
        super(message, ' UnauthorizedError', 401)
    }
}

class ForbiddenError extends CustomError {
    constructor(message = '') {
        super(message, 'ForbiddenError', 403)
    }
}

class NotFoundError extends CustomError {
    constructor(message = '') {
        super(message, 'NotFoundError', 404)
    }
}

class ConflictError extends CustomError {
    constructor(message = '') {
        super(message, 'ConflictError', 409)
    }
}

class InvalidCredentialsError extends CustomError {
    constructor(message = '') {
        super(message, 'InvalidCredentialsError', 401)
    }
}

module.exports = {
    CustomError,
    useCustomErrorHandler,
    BadRequestError,
    ForbiddenError,
    UnauthorizedError,
    NotFoundError,
    ConflictError,
    InvalidCredentialsError
}
