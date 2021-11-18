import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, 'Имя не может быть больше 100 символов'],
      default: 'Шарик Обнимашкин',
    },
    email: {
      type: String,
      required: [true, 'Введите EMail'],
    },
    image: {
      type: String,
      default: null,
    },
    phone: {
      type: Number,
      default: null,
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
    instagram: {
      type: String,
      default: null,
    },
    vk: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'client',
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
    prevActivityAt: {
      type: Date,
      default: Date.now,
    },
    archive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Users || mongoose.model('Users', UsersSchema)
