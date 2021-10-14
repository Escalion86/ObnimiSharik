import mongoose from 'mongoose'

const ProductTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите название типа товара'],
    maxlength: [100, 'Название типа товара не может превышать 100 смволов'],
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.ProductTypes ||
  mongoose.model('ProductTypes', ProductTypesSchema)
