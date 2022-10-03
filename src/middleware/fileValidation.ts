import {NextFunction, Request, Response} from 'express'
import ApiError from '../error/ApiError'

export const fileValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) return next(ApiError.badRequest('Невыбран файл аватарки'))

  next()
}
