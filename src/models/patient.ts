import {model, Schema} from 'mongoose'
import {IPatient, Models} from '../types/models'

const patientSchema = new Schema<IPatient>({
  fullname: {type: String, required: true},
  avatar: {type: String, required: true},
  phone: {type: String, required: true},
})

export const Patient = model<IPatient>(Models.patient, patientSchema)
