import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const UsersSchema = new mongoose.Schema({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, 'Please provide a name for this type'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    // required: [false, 'Please provide a description for this baloon.'],
    maxlength: [400, 'Description cannot be more than 400 characters'],
  },
  image: {
    type: String,
    // required: [false, 'Please provide a description for this baloon.'],
    // maxlength: [400, 'Description cannot be more than 400 characters'],
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  role: {
    type: String,
  },
})

export default mongoose.models.Users || mongoose.model('Users', UsersSchema)
