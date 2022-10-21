import {Schema, model} from 'mongoose'
import {Models, ILogin} from '../types/models'

const loginSchema = new Schema<ILogin>(
  {
    login: {type: String, unique: true},
    password: {type: String},
    role: {type: String},
  },
  {versionKey: false, capped: {size: 1024, max: 1, autoIndexId: true}}
)

export const Login = model<ILogin>(Models.login, loginSchema)
