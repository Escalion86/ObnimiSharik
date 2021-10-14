import mongoose from 'mongoose'

const ProductCirculationsSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость'],
    default: 0,
  },
  orderId: {
    type: String,
  },
  defective: {
    type: Boolean,
    default: false,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
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

export default mongoose.models.ProductCirculations ||
  mongoose.model('ProductCirculations', ProductCirculationsSchema)
