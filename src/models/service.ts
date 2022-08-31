import {Schema, model} from 'mongoose'
import {Models, IService} from '../types/models'

const serviceSchema = new Schema<IService>(
  {
    price: {type: String},
    diagnos: {type: String},
  },
  {versionKey: false}
)

export const Service = model<IService>(Models.service, serviceSchema)
