import mongoose from 'mongoose'
import devToDoSchema from '@schemas/devToDoSchema'
const autoIncrement = require('mongoose-auto-increment')

const DevToDoSchema = new mongoose.Schema(devToDoSchema, { timestamps: true })

// autoIncrement.initialize(mongoose.connection)

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
