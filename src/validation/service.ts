import {checkSchema} from 'express-validator'

const validation = () =>
  checkSchema({
    diagnos: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Диагноз обязательное поле',
      },
    },
    price: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Цена обязательное поле',
      },
    },
  })

export default validation
