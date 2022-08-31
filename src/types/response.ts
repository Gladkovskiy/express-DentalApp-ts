import {Types} from 'mongoose'

export interface IFindPatient {
  _id: Types.ObjectId
  fullname: string
  avatar: string
  phone: string
}

export interface IFindService {
  _id: Types.ObjectId
  diagnos: string
  price: string
}

export interface IFindAppoinments {
  dentNumber: number
  date: number
  service: IFindService
  patient: IFindPatient
  _id: Types.ObjectId
}

interface IData {
  time: string
  patient: IFindPatient
  service: IFindService
}

export interface ISortAppoinments {
  title: string
  data: IData[]
}
