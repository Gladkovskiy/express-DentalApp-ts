import {Schema, model} from 'mongoose'
import {Models, IAppointment} from '../types/models'

const appoinmentSchema = new Schema<IAppointment>(
  {
    dentNumber: {type: Number, required: true},
    time: {type: String, required: true},
    date: {type: String, required: true},
    priceId: {type: Schema.Types.ObjectId, ref: Models.service, required: true},
    patientId: {
      type: Schema.Types.ObjectId,
      ref: Models.patient,
      required: true,
    },
  },
  {timestamps: true}
)

export const Appoinment = model<IAppointment>(
  Models.appoinment,
  appoinmentSchema
)
