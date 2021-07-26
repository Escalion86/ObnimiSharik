import mongoose from 'mongoose'
import DeliveryAdressesSchema from './DeliveryAdresses'

const CartsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'Необходимо указать id пользователя'],
  },
  products: {
    type: Array,
    default: [],
  },
  sets: {
    type: Array,
    default: [],
  },
  discount: {
    type: Number,
    default: 0,
    maxlength: [8, 'Скидка не может превышать 999999,99 руб'],
  },
  full_price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость за штуку'],
    maxlength: [8, 'Стоимость не может превышать 999999,99 руб'],
  },
  delivery_adress: [DeliveryAdressesSchema],
  delivery_date_from: {
    type: Date,
    default: Date.now,
  },
  delivery_date_to: {
    type: Date,
    default: Date.now,
  },
  deliver_id: {
    type: String,
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

export default mongoose.models.Carts || mongoose.model('Carts', CartsSchema)
