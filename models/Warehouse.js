import mongoose from 'mongoose'

const warehouseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: ['Aparato', 'Mercancía', 'Otro'],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    stock: {
      type: Number,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['Disponible', 'No disponible'],
      required: true,
    },
    image: {
      type: String,
    },
    image_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const Warehouse = mongoose.model('Warehouse', warehouseSchema)
export default Warehouse
