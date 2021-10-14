import mongoose from 'mongoose'

const ProductsSchema = new mongoose.Schema({
  article: {
    type: String,
    // maxlength: [20, 'Длинна артикула товара не может превышать 20 смволов'],
    default: '',
  },
  name: {
    type: String,
    required: [true, 'Введите название товара'],
    maxlength: [100, 'Название товара не может превышать 100 смволов'],
    default: '',
  },
  description: {
    type: String,
    maxlength: [600, 'Описание не может превышать 600 символов'],
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость'],
    maxlength: [8, 'Стоимость не может превышать 999999,99 руб'],
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  typesId: {
    type: Array,
    default: [],
  },
  archive: {
    type: Boolean,
    default: false,
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

export default mongoose.models.Products ||
  mongoose.model('Products', ProductsSchema)
