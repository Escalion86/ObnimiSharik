import mongoose from 'mongoose'
import districtsSchema from '@schemas/districtsSchema'

const DistrictsSchema = new mongoose.Schema(districtsSchema, {
  timestamps: true,
})

export default mongoose.models.Districts ||
  mongoose.model('Districts', DistrictsSchema)
