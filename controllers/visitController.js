import Visit from '../models/Visits.js'

const getVisits = async (req, res) => {
  const visits = await Visit.find()
  res.json(visits)
}

const newVisit = async (req, res) => {
  const visit = new Visit(req.body)

  try {
    const savedVisit = await visit.save()
    res.json(savedVisit)
  } catch (error) {
    console.log(error)
  }
}

export {
  getVisits,
  newVisit,
}
