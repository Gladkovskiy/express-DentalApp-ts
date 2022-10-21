import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {NextFunction, Response} from 'express'
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import ApiError from '../error/ApiError'
import {Login} from '../models/login'
import {TypedRequestBody} from '../types/express'
import {ILogin} from '../types/models'
import {errorMsg} from '../validation/errorsMessage'

dotenv.config()

// функция для создания токена
const jwtCreate = (_id: string, login: string, role: string) =>
  // создаём jwt токен 1й парметр payload: {id: user.id, email, role} для считывание на frontend
  // 2й параметр секртеный ключ, 3й параметр время жизни токена
  jwt.sign({_id, login, role}, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })

export const addLogin = async (
  req: TypedRequestBody<ILogin>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest(errorMsg(errors)))
    }

    const {login, password, role} = req.body
    const hashPassword = await bcrypt.hash(password, 5)

    await Login.create({login, role, password: hashPassword})

    return res.status(200).json({res: 'Добавлено'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const login = async (
  req: TypedRequestBody<ILogin>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {login, password} = req.body

    const user = await Login.findOne<ILogin>({login})
    if (!user)
      return next(ApiError.badRequest('Пользователь с таким именем не найден'))

    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) return next(ApiError.badRequest('Неверный пароль'))

    const jwtToken = jwtCreate(String(user._id), user.login, user.role)

    res.status(200).json({toke: jwtToken})
  } catch (error) {
    next(ApiError.internal(error.message))
  }
}

interface IUser {
  _id: string
  login: string
  role: string
}

export const check = async (
  req: TypedRequestBody<{user: IUser}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {_id, login, role} = req.body.user
    const token = jwtCreate(_id, login, role)
    res.status(200).json({token})
  } catch (error) {
    next(ApiError.internal(error.message))
  }
}

export const updatePassword = async (
  req: TypedRequestBody<{_id: string; password: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {_id, password} = req.body
    const hashPassword = await bcrypt.hash(password, 5)

    await Login.findByIdAndUpdate(_id, {password: hashPassword})

    return res.status(200).json({res: 'Пароль изменён'})
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}
