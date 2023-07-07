import { NextFunction, Request, Response } from 'express'
import ApiError from '../error/ApiError.js'

const ErrorHandlingMiddleware = function(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  return res.status(500).json({ message: 'Unknown Error' })
}

export default ErrorHandlingMiddleware