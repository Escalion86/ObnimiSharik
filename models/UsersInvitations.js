import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const UsersInvitationsSchema = new mongoose.Schema({
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
})

export default mongoose.models.UsersInvitations ||
  mongoose.model('UsersInvitations', UsersInvitationsSchema)
