import {NextFunction, Request, Response} from 'express'
import {validationResult} from 'express-validator'
import ApiError from '../error/ApiError'
import {Patient} from '../models/patient'
import {TypedRequestBody, TypedRequestQuery} from '../types/express'
import {IPatient} from '../types/models'
import {IFindPatient} from '../types/response'
import {errorMsg} from '../validation/errorsMessage'

export const addPatient = async (
  req: TypedRequestBody<IPatient>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errorMsg(errors)))
    }

    const {avatar, fullname, phone} = req.body
    await Patient.create({avatar, fullname, phone})

    return res.status(200).json({res: 'Добавлено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IFindPatient[] = await Patient.find().sort({fullname: 1})

    return res.status(200).json(data)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const getOnePatient = async (
  req: TypedRequestQuery<{_id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {_id} = req.query
    const data = await Patient.findById(_id)

    return res.status(200).json(data)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const deletePatient = async (
  req: TypedRequestQuery<{_id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {_id} = req.query
    await Patient.findByIdAndDelete(_id)

    return res.status(200).json({res: 'Удалено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const deleteAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Patient.remove()

    return res.status(200).json({res: 'Удалено всё'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const updatePatient = async (
  req: TypedRequestBody<IPatient>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errorMsg(errors)))
    }

    const {_id, avatar, fullname, phone} = req.body
    await Patient.findByIdAndUpdate(_id, {avatar, fullname, phone})

    return res.status(200).json({res: 'Изменено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const searchPatient = async (
  req: TypedRequestQuery<{fullname: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {fullname} = req.query
    const data = await Patient.find({
      fullname: new RegExp(`^${fullname}`, 'i'),
    })
    return res.status(200).json(data)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}
