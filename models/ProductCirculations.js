import mongoose from 'mongoose'
import productCirculationsSchema from '@schemas/productCirculationsSchema'

const ProductCirculationsSchema = new mongoose.Schema(
  productCirculationsSchema,
  { timestamps: true }
)

export default mongoose.models.ProductCirculations ||
  mongoose.model('ProductCirculations', ProductCirculationsSchema)
