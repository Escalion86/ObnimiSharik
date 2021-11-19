import mongoose from 'mongoose'
import setsSchema from '@schemas/setsSchema'

const SetsSchema = new mongoose.Schema(setsSchema, { timestamps: true })

export default mongoose.models.Sets || mongoose.model('Sets', SetsSchema)
