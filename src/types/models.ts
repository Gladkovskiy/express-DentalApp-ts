import {Types} from 'mongoose'

export enum Models {
  patient = 'Patient',
  service = 'Service',
  appoinment = 'Appoinment',
}

export interface IPatient {
  fullname: string
  avatar: string
  phone: string
  _id: Types.ObjectId
}

export interface IService {
  diagnos: string
  price: string
  _id: Types.ObjectId
}

export interface IAppointment {
  dentNumber: number
  date: number
  service: Types.ObjectId
  patient: Types.ObjectId
  _id: Types.ObjectId
}
