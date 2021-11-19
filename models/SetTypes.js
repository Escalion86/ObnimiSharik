import mongoose from 'mongoose'
import setTypesSchema from '@schemas/setTypesSchema'

const SetTypesSchema = new mongoose.Schema(setTypesSchema, { timestamps: true })

export default mongoose.models.SetTypes ||
  mongoose.model('SetTypes', SetTypesSchema)
