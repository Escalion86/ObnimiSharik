import mongoose from 'mongoose'
const autoIncrement = require('mongoose-auto-increment')

const DevToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [100, 'Заголовок не может быть больше 100 символов'],
  },
  description: {
    type: String,
    maxlength: [600, 'Описание не может быть больше 600 символов'],
  },
  images: {
    type: Array,
    default: [],
  },
  userId: {
    type: String,
    required: [true, 'Необходимо указать id заявителя'],
  },
  status: {
    type: String, // created, inProgress, finished
    required: [true, 'Введите статус'],
    default: 'created',
  },
  priority: {
    type: Number,
    required: [true, 'Введите приоритет'],
    default: 0,
  },
  finishedAt: {
    type: Date,
    default: null,
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

DevToDoSchema.plugin(autoIncrement.plugin, {
  model: 'DevToDo',
  field: 'number',
  startAt: 1,
  incrementBy: 1,
  type: Number,
  unique: false,
})

export default mongoose.models.DevToDo ||
  mongoose.model('DevToDo', DevToDoSchema)
