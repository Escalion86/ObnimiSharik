import mongoose from 'mongoose'

const DistrictsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Введите название района'],
      maxlength: [100, 'Название товара не может превышать 100 смволов'],
      default: '',
    },
    deliveryPrice: {
      type: Number,
      required: [true, 'Пожалуйста укажите стоимость доставки в район'],
      maxlength: [8, 'Стоимость не может превышать 999999,99 руб'],
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Districts ||
  mongoose.model('Districts', DistrictsSchema)
