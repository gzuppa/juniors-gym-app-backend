import express from 'express'
import {
  getVisits,
  newVisit,
} from '../controllers/visitController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.route('/').get(checkAuth, getVisits).post(checkAuth, newVisit)

export default router
