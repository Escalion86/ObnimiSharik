import mongoose from 'mongoose'

const DeliveryAdressesSchema = new mongoose.Schema({
  town: String,
  street: String,
  flat: String,
  comment: String,
})

export default mongoose.models.DeliveryAdresses ||
  mongoose.model('DeliveryAdresses', DeliveryAdressesSchema)
