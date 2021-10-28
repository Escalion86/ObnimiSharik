import mongoose from 'mongoose'
import { DistrictsSchema } from './Districts'

const DeliveryAddressesSchema = new mongoose.Schema({
  town: { type: String },
  district: { type: DistrictsSchema },
  street: { type: String },
  house: { type: String },
  entrance: { type: String },
  floor: { type: String },
  comment: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.DeliveryAdresses ||
  mongoose.model('DeliveryAddresses', DeliveryAddressesSchema)
