import mongoose from 'mongoose'
import paymentsSchema from '@schemas/paymentsSchema'
const autoIncrement = require('mongoose-auto-increment')

const PaymentsSchema = new mongoose.Schema(paymentsSchema, { timestamps: true })

autoIncrement.initialize(mongoose.connection)

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
