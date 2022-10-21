import {checkSchema} from 'express-validator'

const validation = () =>
  checkSchema({
    login: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Логин обязательное поле',
      },
    },
    password: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Пароль обязательное поле',
      },
    },
    role: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Роль обязательное поле',
      },
    },
  })

export default validation
