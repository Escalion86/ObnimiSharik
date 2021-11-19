import mongoose from 'mongoose'
import productTypesSchema from '@schemas/productTypesSchema'

const ProductTypesSchema = new mongoose.Schema(productTypesSchema, {
  timestamps: true,
})

export default mongoose.models.ProductTypes ||
  mongoose.model('ProductTypes', ProductTypesSchema)
