import mongoose from 'mongoose'

const SetTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите название типа набора'],
    maxlength: [100, 'Название типа набора не может превышать 100 смволов'],
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
