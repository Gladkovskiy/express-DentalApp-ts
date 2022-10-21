import express from 'express'
import {
  addLogin,
  check,
  login,
  updatePassword,
} from '../controllers/loginController'
import authMidleware from '../middleware/authMidleware'
import validation from '../validation/login'

const router = express.Router()

router.post('/create', validation(), addLogin)
router.post('/', login)
router.get('/', authMidleware, check)
router.put('/', updatePassword)

export default router
