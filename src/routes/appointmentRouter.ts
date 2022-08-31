import express from 'express'
import {
  addAppoinment,
  deleteAllAppoinments,
  deleteAppointment,
  getAppointments,
  getPatientAppointments,
  updateAppoinment,
} from '../controllers/appointmentController'
import validate from '../validation/appoinment'

const router = express.Router()

router.post('/', validate(), addAppoinment)
router.get('/', getAppointments)
router.get('/patientAppoinments', getPatientAppointments)
router.delete('/', deleteAppointment)
router.delete('/all', deleteAllAppoinments)
router.put('/', validate(), updateAppoinment)

export default router
