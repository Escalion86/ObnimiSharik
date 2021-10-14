import mongoose from 'mongoose'

const InvitationsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Введите EMail'],
  },
  role: {
    type: String,
    default: 'client',
  },
  status: {
    type: String,
    default: 'created',
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

export default mongoose.models.Invitations ||
  mongoose.model('Invitations', InvitationsSchema)
