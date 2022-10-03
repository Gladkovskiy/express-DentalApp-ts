import express from 'express'
import {
  addPatient,
  deleteAllPatients,
  deletePatient,
  getPatients,
  searchPatient,
  updatePatient,
} from '../controllers/patientController'
import {fileValidation} from '../middleware/fileValidation'
import validation from '../validation/patient'

const router = express.Router()

router.post('/', fileValidation, validation(), addPatient)
router.get('/', getPatients)
router.get('/search', searchPatient)
router.delete('/', deletePatient)
router.delete('/all', deleteAllPatients)
router.put('/', validation(), updatePatient)

export default router
