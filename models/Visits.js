import mongoose from 'mongoose'

const visitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    visitDate: {
      type: Date,
      default: Date.now(),
    },
    visitPay: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Visit = mongoose.model('Visit', visitSchema)
export default Visit
