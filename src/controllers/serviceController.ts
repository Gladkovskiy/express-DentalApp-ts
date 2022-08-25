import express, {Response, NextFunction} from 'express'
import {MongooseError} from 'mongoose'
import ApiError from '../error/ApiError'
import {Service} from '../models/service'
import {TypedRequestBody} from '../types/express'
import {IService} from '../types/models'

export const addService = async (
  req: TypedRequestBody<IService>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {diagnos, price} = req.body
    const data = await Service.create({diagnos, price})
    return res.json(data)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}
