import {NextFunction, Request, Response} from 'express'
import ApiError from '../error/ApiError'
import {Appoinment} from '../models/appoinment'
import {TypedRequestBody, TypedRequestQuery} from '../types/express'
import {IAppointment} from '../types/models'
import {validationResult} from 'express-validator'
import {errorMsg} from '../validation/errorsMessage'
import {
  IFindAppoinments,
  IFindPatient,
  IFindService,
  ISortAppoinments,
} from '../types/response'

export const addAppoinment = async (
  req: TypedRequestBody<IAppointment>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errorMsg(errors)))
    }

    const {date, dentNumber, patient, service} = req.body
    const data = {date, dentNumber, patient, service}
    await Appoinment.create({...data})

    return res.status(200).json({res: 'Добавлено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IFindAppoinments[] = await Appoinment.find()
      .populate<{service: IFindService}>('service')
      .populate<{patient: IFindPatient}>('patient')
      .sort({date: 1})

    const arrDate: string[] = data.reduce((date, appoinment) => {
      const stringDate = new Date(appoinment.date).toLocaleDateString()

      const findDate = date.find(item => item === stringDate)
      if (!findDate) return [...date, stringDate]
      return date
    }, [])

    const sortedData: ISortAppoinments[] = arrDate.map(date => ({
      title: date,
      data: data.reduce(
        (app, {date: timeApp, patient, service, dentNumber}) => {
          if (date === new Date(timeApp).toLocaleDateString()) {
            const tempTime = new Date(timeApp).toLocaleTimeString().split(':')
            const time = [tempTime[0], tempTime[1]].join(':')

            return [
              ...app,
              {
                time,
                patient,
                service,
                dentNumber,
              },
            ]
          }
          return app
        },
        []
      ),
    }))

    return res.status(200).json(sortedData)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const getPatientAppointments = async (
  req: TypedRequestQuery<{_id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {_id} = req.query
    const data = await Appoinment.find({patient: _id})
      .populate('service')
      .sort({date: 1})

    return res.status(200).json(data)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const deleteAppointment = async (
  req: TypedRequestQuery<{_id: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {_id} = req.query
    await Appoinment.findByIdAndDelete(_id)

    return res.status(200).json({res: 'Удалено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const deleteAllAppoinments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Appoinment.remove()

    return res.status(200).json({res: 'Удалено всё'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const updateAppoinment = async (
  req: TypedRequestBody<IAppointment>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errorMsg(errors)))
    }

    const {_id, date, dentNumber, patient, service} = req.body
    const data = {date, dentNumber, patient, service}
    await Appoinment.findByIdAndUpdate(_id, {...data})

    return res.status(200).json({res: 'Изменено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}
