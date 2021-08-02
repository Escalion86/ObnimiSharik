import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const SetsSchema = new mongoose.Schema({
  article: {
    type: String,
    maxlength: [20, 'Длинна артикула набора не может превышать 20 смволов'],
    default: '',
  },
  name: {
    type: String,
    required: [true, 'Введите название набора'],
    maxlength: [80, 'Название набора не может превышать 80 смволов'],
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
    dafeult: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  productsId: {
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

export default mongoose.models.Sets || mongoose.model('Sets', SetsSchema)
