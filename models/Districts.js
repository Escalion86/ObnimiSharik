import mongoose from 'mongoose'

const DistrictsSchema = new mongoose.Schema(districtsSchema, {
  timestamps: true,
})

export default mongoose.models.Districts ||
  mongoose.model('Districts', DistrictsSchema)
