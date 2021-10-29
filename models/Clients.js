import mongoose from 'mongoose'

const ClientsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, 'Имя не может быть больше 100 символов'],
      default: 'Шарик Обнимашкин',
    },
    email: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    phone: {
      type: Number,
      required: [true, 'Введите номер телефона'],
    },
    whatsapp: {
      type: Number,
      default: null,
    },
    viber: {
      type: Number,
      default: null,
    },
    telegram: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Clients ||
  mongoose.model('Clients', ClientsSchema)
