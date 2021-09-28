import mongoose from 'mongoose'
const autoIncrement = require('mongoose-auto-increment')
// import DeliveryAddressesSchema from './DeliveryAddresses'

const OrdersSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: [true, 'Необходимо указать id клиента'],
  },
  productsCount: {
    type: Array,
    default: [],
  },
  setsCount: {
    type: Array,
    default: [],
  },
  // number: {
  //   type: Number,
  //   default: 0,
  // },
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
  comment: {
    type: String,
    default: '',
  },
  deliveryPickup: {
    type: Boolean,
    default: true,
  },
  deliveryAddress: {
    type: Map,
    of: String,
    // of: new mongoose.Schema({
    //   town: String,
    //   street: String,
    //   floor: String,
    //   entrance: String,
    //   flat: String,
    //   comment: String,
    //   // createdAt: {
    //   //   type: Date,
    //   //   default: Date.now,
    //   // },
    //   // updatedAt: {
    //   //   type: Date,
    //   //   default: Date.now,
    //   // },
    // }),
  },
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

OrdersSchema.plugin(autoIncrement.plugin, {
  model: 'Orders',
  field: 'number',
  startAt: 1,
  incrementBy: 1,
  type: Number,
  unique: false,
})

export default mongoose.models.Orders || mongoose.model('Orders', OrdersSchema)
