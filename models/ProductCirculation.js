import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProductCirculationSchema = new mongoose.Schema({
  product_id: {
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
  cart_id: {
    type: String,
    required: [true, 'Необходимо указать id корзины'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.ProductCirculation ||
  mongoose.model('ProductCirculation', ProductCirculationSchema)
