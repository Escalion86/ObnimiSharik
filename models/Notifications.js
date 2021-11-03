import mongoose from 'mongoose'

const NotificationsSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String, default: '' },
    dbName: { type: String },
    itemId: { type: String },
    status: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.Notifications ||
  mongoose.model('Notifications', NotificationsSchema)
