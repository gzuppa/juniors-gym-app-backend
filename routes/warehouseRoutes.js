import express from 'express'
import {
  getAllArticles,
  getArticle,
  newArticle,
} from '../controllers/warehouseController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.route('/').get(checkAuth, getAllArticles).post(checkAuth, newArticle)
router.route('/:id').get(checkAuth, getArticle)

export default router
