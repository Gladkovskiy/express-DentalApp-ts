import express from 'express'
import {Routs} from '../types/router'
import serviceRoutes from './serviceRoutes'

const router = new (express.Router as any)()

// Объединение всех роутеров в один
router.use(Routs.service, serviceRoutes)

export default router
