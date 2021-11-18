import mongoose from 'mongoose'

const ProductTypesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Введите название типа товара'],
      maxlength: [100, 'Название типа товара не может превышать 100 смволов'],
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
    archive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.ProductTypes ||
  mongoose.model('ProductTypes', ProductTypesSchema)
