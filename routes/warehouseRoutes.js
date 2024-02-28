import express from 'express'
import {
  editArticle,
  getAllArticles,
  getArticle,
  newArticle,
} from '../controllers/warehouseController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.route('/').get(checkAuth, getAllArticles).post(checkAuth, newArticle)
router.route('/:id').get(checkAuth, getArticle).put(checkAuth, editArticle)

export default router
