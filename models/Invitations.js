import mongoose from 'mongoose'
import invitationsSchema from '@schemas/invitationsSchema'

const InvitationsSchema = new mongoose.Schema(invitationsSchema, {
  timestamps: true,
})

export default mongoose.models.Invitations ||
  mongoose.model('Invitations', InvitationsSchema)
