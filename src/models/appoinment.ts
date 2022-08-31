import {Schema, model} from 'mongoose'
import {Models, IAppointment} from '../types/models'

const appoinmentSchema = new Schema<IAppointment>(
  {
    dentNumber: {type: Number},
    date: {type: Number},
    service: {type: Schema.Types.ObjectId, ref: Models.service},
    patient: {
      type: Schema.Types.ObjectId,
      ref: Models.patient,
    },
  },
  {timestamps: true, versionKey: false}
)

export const Appoinment = model<IAppointment>(
  Models.appoinment,
  appoinmentSchema
)
