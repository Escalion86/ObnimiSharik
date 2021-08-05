import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
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
