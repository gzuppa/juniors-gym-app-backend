import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import memberRoutes from './routes/memberRoutes.js'
import trainingRoutes from './routes/trainingRoutes.js'
import warehouseRoutes from './routes/warehouseRoutes.js'

const app = express()
app.use(express.json({ limit: '50mb' }))
dotenv.config()
connectDB()

const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
    }
  },
}

app.use(cors(corsOptions))

//Routing
app.use('/api/users', userRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/trainings', trainingRoutes)
app.use('/api/warehouse', warehouseRoutes)

const PORT = process.env.PORT || 4000

const mainServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

import { Server } from 'socket.io'

const io = new Server(mainServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})

io.on('connection', socket => {
  socket.on('Open member', member => {
    socket.join(member)
  })
  socket.on('new training', training => {
    const member = training.member
    socket.to(member).emit('added training', training)
  })
  socket.on('delete training', training => {
    const member = training.member
    socket.to(member).emit('deleted training', training)
  })
  socket.on('update training', training => {
    const member = training.member._id
    socket.to(member).emit('updated training', training)
  })
  socket.on('change status', training => {
    const member = training.member._id
    socket.to(member).emit('new status', training)
  })
})
