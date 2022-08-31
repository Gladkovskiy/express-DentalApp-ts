import {NextFunction, Request, Response} from 'express'
import ApiError from '../error/ApiError'
import {Service} from '../models/service'
import {TypedRequestBody, TypedRequestQuery} from '../types/express'
import {IService} from '../types/models'
import {validationResult} from 'express-validator'
import {errorMsg} from '../validation/errorsMessage'

export const addService = async (
  req: TypedRequestBody<IService>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errorMsg(errors)))
    }

    const {diagnos, price} = req.body
    await Service.create({diagnos, price})

    return res.status(200).json({res: 'Добавлено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const getService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Service.find().sort({price: 1})

    return res.status(200).json(data)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const deleteService = async (
  req: TypedRequestQuery<{_id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {_id} = req.query
    await Service.findByIdAndDelete(_id)

    return res.status(200).json({res: 'Удалено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const deleteAllService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Service.remove()

    return res.status(200).json({res: 'Удалено всё'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const updateService = async (
  req: TypedRequestBody<IService>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errorMsg(errors)))
    }

    const {_id, diagnos, price} = req.body
    await Service.findByIdAndUpdate(_id, {diagnos, price})

    return res.status(200).json({res: 'Изменено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}
