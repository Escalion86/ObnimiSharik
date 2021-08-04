import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const SetTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите название типа набора'],
    maxlength: [80, 'Название типа набора не может превышать 80 смволов'],
    default: '',
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

export default mongoose.models.SetTypes ||
  mongoose.model('SetTypes', SetTypesSchema)
