import express from 'express'
import {Routs} from '../types/router'
import serviceRoutes from './serviceRoutes'
import pacientRouter from './pacientRouter'
import appointmentRouter from './appointmentRouter'
import loginRouter from './loginRouter'

const router = express.Router()

// Объединение всех роутеров в один
router.use(Routs.service, serviceRoutes)
router.use(Routs.patient, pacientRouter)
router.use(Routs.appoinment, appointmentRouter)
router.use(Routs.login, loginRouter)

export default router
