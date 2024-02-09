import express from 'express'
import {
  authenticate,
  confirm,
  confirmToken,
  forgotPassword,
  newPassword,
  profile,
  registerUser,
} from '../controllers/userController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/', registerUser)
router.post('/login', authenticate)
router.get('/confirm/:token', confirm)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token').get(confirmToken).post(newPassword)

router.get('/profile', checkAuth, profile)

export default router
