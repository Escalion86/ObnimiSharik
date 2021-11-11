import mongoose from 'mongoose'
import { DistrictsSchema } from './Districts'

const DeliveryAddressesSchema = new mongoose.Schema(
  {
    town: { type: String },
    district: { type: DistrictsSchema },
    street: { type: String },
    house: { type: String },
    entrance: { type: String },
    floor: { type: String },
    comment: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.DeliveryAddresses ||
  mongoose.model('DeliveryAddresses', DeliveryAddressesSchema)
