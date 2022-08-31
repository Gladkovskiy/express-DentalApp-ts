import {model, Schema} from 'mongoose'
import {IPatient, Models} from '../types/models'

const patientSchema = new Schema<IPatient>(
  {
    fullname: {type: String},
    avatar: {type: String},
    phone: {type: String},
  },
  {versionKey: false}
)

export const Patient = model<IPatient>(Models.patient, patientSchema)
