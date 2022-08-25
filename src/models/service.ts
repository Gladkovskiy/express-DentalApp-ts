import {Schema, model} from 'mongoose'
import {Models, IService} from '../types/models'

const serviceSchema = new Schema<IService>({
  price: {type: String, required: true},
  diagnos: {type: String, required: true},
})

export const Service = model<IService>(Models.service, serviceSchema)
