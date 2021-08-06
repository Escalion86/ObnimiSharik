import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProductCirculationSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Необходимо указать id продукта'],
  },
  purchase: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    required: [true, 'Пожалуйста укажите количество'],
    maxlength: [6, 'Количество не может превышать 999999 шт'],
    default: 1,
  },
  orderId: {
    type: String,
    required: [true, 'Необходимо указать id корзины'],
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

export default mongoose.models.ProductCirculation ||
  mongoose.model('ProductCirculation', ProductCirculationSchema)
