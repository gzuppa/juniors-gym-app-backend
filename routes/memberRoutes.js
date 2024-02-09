import express from 'express'
import {
  addAssistance,
  addSecondaryTrainer,
  deleteMembers,
  deleteSecondaryTrainer,
  editMember,
  getAllMembers,
  getMember,
  getMembers,
  newMember,
  searchSecondaryTrainer,
} from '../controllers/memberController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.route('/').get(checkAuth, getMembers).post(checkAuth, newMember)
router.get('/all-members', getAllMembers)
router
  .route('/:id')
  .get(checkAuth, getMember)
  .put(checkAuth, editMember)
  .delete(checkAuth, deleteMembers)
router.post('/trainers', checkAuth, searchSecondaryTrainer)
router.post('/trainers/:id', checkAuth, addSecondaryTrainer)
router.post('/delete-trainers/:id', checkAuth, deleteSecondaryTrainer)
router.post('/assistance/:id', addAssistance)

export default router
