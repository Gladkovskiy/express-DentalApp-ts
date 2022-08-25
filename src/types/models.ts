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
}

export interface IService {
  diagnos: string
  price: string
}

export interface IAppointment {
  dentNumber: number
  time: string
  date: string
  priceId: Types.ObjectId
  patientId: Types.ObjectId
}
