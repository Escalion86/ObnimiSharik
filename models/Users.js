import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const UsersSchema = new mongoose.Schema({
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
  lastAuthAt: {
    type: Date,
    default: Date.now,
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

export default mongoose.models.Users || mongoose.model('Users', UsersSchema)
