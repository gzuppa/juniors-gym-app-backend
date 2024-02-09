import mongoose from 'mongoose'

const trainingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    level: {
      type: String,
      required: true,
      enum: ['Principiante', 'Intermedio', 'Avanzado', 'Alto Nivel'],
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
    completed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const Training = mongoose.model('Training', trainingSchema)
export default Training
