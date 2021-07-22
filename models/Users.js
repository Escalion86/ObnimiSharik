import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [80, 'Имя не может быть больше 80 символов'],
    default: 'Шарик Обнимашкин',
  },
  email: {
    type: String,
    required: [true, 'Введите почту'],
  },
  image_url: {
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
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Users || mongoose.model('Users', UsersSchema)
