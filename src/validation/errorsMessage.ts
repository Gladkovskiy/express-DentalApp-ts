import {Result, ValidationError} from 'express-validator'

export const errorMsg = (errors: Result<ValidationError>) =>
  errors
    .array()
    .map(error => error.msg)
    .join(', ')
