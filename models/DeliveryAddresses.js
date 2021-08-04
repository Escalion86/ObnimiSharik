import mongoose from 'mongoose'

const DeliveryAddressesSchema = new mongoose.Schema({
  town: String,
  street: String,
  flat: String,
  comment: String,
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
