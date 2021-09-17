import mongoose from 'mongoose'
import DeliveryAddressesSchema from './DeliveryAddresses'

const OrdersSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: [true, 'Необходимо указать id клиента'],
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
  fullPrice: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость за штуку'],
    maxlength: [8, 'Стоимость не может превышать 999999,99 руб'],
  },
  status: {
    type: String,
    default: 'created',
  },
  deliveryAddress: [DeliveryAddressesSchema],
  deliveryDateFrom: {
    type: Date,
    default: Date.now,
  },
  deliveryDateTo: {
    type: Date,
    default: Date.now,
  },
  deliverId: {
    type: String,
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

export default mongoose.models.Orders || mongoose.model('Orders', OrdersSchema)
