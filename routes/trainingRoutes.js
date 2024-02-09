import express from 'express'
import {
  addTraining,
  changeTrainingStatus,
  deleteTraining,
  getTraining,
  updateTraining,
} from '../controllers/trainingController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router
  .route('/:id')
  .get(checkAuth, getTraining)
  .put(checkAuth, updateTraining)
  .delete(checkAuth, deleteTraining)
router.post('/', checkAuth, addTraining)
router.post('/training-status/:id', checkAuth, changeTrainingStatus)

export default router
