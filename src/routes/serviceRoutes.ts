import express from 'express'
import {
  addService,
  deleteAllService,
  deleteService,
  getService,
  updateService,
} from '../controllers/serviceController'
import validation from '../validation/service'

const router = express.Router()

router.post('/', validation(), addService)
router.get('/', getService)
router.delete('/', deleteService)
router.delete('/all', deleteAllService)
router.put('/', validation(), updateService)

export default router
