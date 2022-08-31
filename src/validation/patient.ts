import {checkSchema} from 'express-validator'

const validation = () =>
  checkSchema({
    fullname: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'ФИО обязательное поле',
      },
    },
    avatar: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Аватар обязательное поле',
      },
    },
    phone: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'Телефон обязательное поле',
      },
      isMobilePhone: {
        options: [['ru-RU', 'uk-UA']],
        errorMessage:
          'Неправильный формат номера +380992777024, 380992777024, 0992777024',
      },
    },
  })

export default validation
