import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProductTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите название типа товара'],
    maxlength: [80, 'Название типа товара не может превышать 80 смволов'],
    default: '',
  },
})

export default mongoose.models.ProductTypes ||
  mongoose.model('ProductTypes', ProductTypesSchema)
