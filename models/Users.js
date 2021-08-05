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
    default: '',
  },
  phone: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: 'client',
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
