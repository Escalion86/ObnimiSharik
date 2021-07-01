import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const SetsSchema = new mongoose.Schema({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, 'Please provide a name for this set'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  description: {
    type: String,
    // required: [false, 'Please provide a description for this baloon.'],
    maxlength: [400, 'Description cannot be more than 400 characters'],
  },
})

export default mongoose.models.Sets || mongoose.model('Sets', SetsSchema)
