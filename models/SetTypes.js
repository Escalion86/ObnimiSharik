import mongoose from 'mongoose'

const SetTypesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Введите название типа набора'],
      maxlength: [100, 'Название типа набора не может превышать 100 смволов'],
      default: '',
    },
    description: {
      type: String,
      maxlength: [600, 'Описание не может превышать 600 символов'],
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    cardSize: {
      type: String,
      default: 'normal', // big, small
    },
  },
  { timestamps: true }
)

export default mongoose.models.SetTypes ||
  mongoose.model('SetTypes', SetTypesSchema)
