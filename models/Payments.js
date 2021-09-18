import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const PaymentsSchema = new mongoose.Schema({
  number: {
    type: Number,
    default: 0,
  },
  clientId: {
    type: String,
    required: [true, 'Необходимо указать id клиента'],
  },
  orderId: {
    type: String,
    required: [true, 'Необходимо указать id заказа'],
  },
  way: {
    type: String,
    default: 'cash',
  },
  sum: {
    type: Number,
    maxlength: [8, 'Сумма не может превышать 999999,99 руб'],
    default: 0,
  },
  status: {
    type: String,
    required: [true, 'Необходимо указать статус'],
    default: 'created',
  },
  payAt: {
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

export default mongoose.models.Payments ||
  mongoose.model('Payments', PaymentsSchema)
