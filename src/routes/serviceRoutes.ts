import express from 'express'
import {addService} from '../controllers/serviceController'

const router = new (express.Router as any)()

router.post('/', addService)

export default router
