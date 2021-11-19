import mongoose from 'mongoose'
import ordersSchema from '@schemas/ordersSchema'
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

const OrdersSchema = new mongoose.Schema(
  {
    ...ordersSchema,
    deliveryAddress: {
      type: deliveryAddressSchema,
    },
  },
  { timestamps: true }
)

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
