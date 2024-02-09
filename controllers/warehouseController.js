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

export { getArticle, getAllArticles, newArticle }
