import mongoose from 'mongoose'
// import { DistrictsSchema } from './Districts'
const autoIncrement = require('mongoose-auto-increment')

const districtsSchema = new mongoose.Schema({
  name: { type: String },
  deliveryPrice: { type: Number },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const deliveryAddressSchema = new mongoose.Schema(
  {
    town: { type: String },
    district: { type: districtsSchema },
    street: { type: String },
    house: { type: String },
    entrance: { type: String },
    floor: { type: String },
    comment: { type: String },
  },
  { timestamps: true }
)

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
  price: {
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
  photos: {
    type: Array,
    default: [],
  },
  deliveryPickup: {
    type: Boolean,
    default: true,
  },
  deliveryPrice: {
    type: Number,
    default: 0,
    maxlength: [8, 'Доставка не может превышать 999999,99 руб'],
  },
  deliveryAddress: {
    type: deliveryAddressSchema,
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
  aerodesignerId: {
    type: String,
  },
  operatorId: {
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

// autoIncrement.initialize(mongoose.connection)

OrdersSchema.plugin(autoIncrement.plugin, {
  model: 'Orders',
  field: 'number',
  startAt: 1,
  incrementBy: 1,
  type: Number,
  unique: false,
})

// const Orders = mongoose.models.Orders || mongoose.model('Orders', OrdersSchema)

// Orders.watch().on('change', (data) => console.log(new Date(), data))

export default mongoose.models.Orders || mongoose.model('Orders', OrdersSchema)
