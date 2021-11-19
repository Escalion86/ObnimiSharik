import mongoose from 'mongoose'
import clientsSchema from '@schemas/clientsSchema'

const ClientsSchema = new mongoose.Schema(clientsSchema, { timestamps: true })

export default mongoose.models.Clients ||
  mongoose.model('Clients', ClientsSchema)
