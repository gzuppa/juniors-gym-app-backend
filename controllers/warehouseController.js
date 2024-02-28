import Warehouse from '../models/Warehouse.js'

const newArticle = async (req, res) => {
  const article = new Warehouse(req.body)

  try {
    const savedArticle = await article.save()
    res.json(savedArticle)
  } catch (error) {
    console.log(error)
  }
}

const getAllArticles = async (req, res) => {
  const articles = await Warehouse.find()
  res.json(articles)
}

const getArticle = async (req, res) => {
  const { id } = req.params
  const article = await Warehouse.findById(id)

  if (!article) {
    const error = new Error('No encontrado')
    return res.status(404).json({ msg: error.message })
  }

  res.json(article)
}

const editArticle = async (req, res) => {
  const { id } = req.params
  const article = await Warehouse.findById(id)
  console.log(article)

  if (!article) {
    const error = new Error('No encontrado')
    return res.status(404).json({ msg: error.message })
  }

  article.name = req.body.name || article.name
  article.description = req.body.description || article.description
  article.price = req.body.price || article.price
  article.stock = req.body.stock || article.stock
  article.status = req.body.status || article.status
  article.type = req.body.type || article.type
  
  try {
    const savedArticle = await article.save()
    res.json(savedArticle)
  } catch (error) {
    console.log(error)
  }
}

export { editArticle, getArticle, getAllArticles, newArticle }
