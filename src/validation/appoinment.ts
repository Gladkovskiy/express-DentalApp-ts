import {checkSchema} from 'express-validator'

const validation = () =>
  checkSchema({
    date: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Дата обязательное поле',
      },
      isInt: true,
    },

    dentNumber: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Номер зуба обязательное поле',
      },
      isInt: {options: {min: 1, max: 32}, errorMessage: 'Зубов всего 32'},
    },
  })

export default validation
