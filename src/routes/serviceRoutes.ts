import express from 'express'
import {
  addService,
  deleteAllService,
  deleteService,
  getService,
  searchService,
  updateService,
} from '../controllers/serviceController'
import validation from '../validation/service'

const router = express.Router()

router.post('/', validation(), addService)
router.get('/', getService)
router.get('/search', searchService)
router.delete('/', deleteService)
router.delete('/all', deleteAllService)
router.put('/', validation(), updateService)

export default router
