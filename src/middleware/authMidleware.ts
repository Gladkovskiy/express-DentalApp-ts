import express, {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import ApiError from '../error/ApiError'

dotenv.config()

const tokenValid = (req: Request, res: Response, next: NextFunction) => {
  try {
    // из хэдера запроса забераем токен
    const jwtToken = req.headers.authorization.split(' ')[1] // токен 2е слово

    // если токена нет то пшим сообщение не авторизирован
    if (jwtToken === 'null') {
      return next(ApiError.unauthorized('Пользователь не авторизован'))
    }

    // декодируем токен получаем id, login, role
    const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY)

    // добавляем в запрос и передаём в userController
    // добавляем userRouter.js в route /auth перед chek
    req.body.user = decoded
    next()
  } catch (error) {
    next(ApiError.internal(error.message))
  }
}

export default tokenValid
