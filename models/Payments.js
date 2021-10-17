import mongoose from 'mongoose'
const autoIncrement = require('mongoose-auto-increment')

const PaymentsSchema = new mongoose.Schema({
  // number: {
  //   type: Number,
  //   default: 0,
  // },
  clientId: {
    type: String,
    required: [true, 'Необходимо указать id клиента'],
  },
  orderId: {
    type: String,
    required: [true, 'Необходимо указать id заказа'],
  },
  payType: {
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

PaymentsSchema.plugin(autoIncrement.plugin, {
  model: 'Payments',
  field: 'number',
  startAt: 1,
  incrementBy: 1,
  type: Number,
  unique: false,
})

export default mongoose.models.Payments ||
  mongoose.model('Payments', PaymentsSchema)
