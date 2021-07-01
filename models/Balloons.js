import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const BalloonsSchema = new mongoose.Schema({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, 'Please provide a name for this baloon.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  description: {
    type: String,
    // required: [false, 'Please provide a description for this baloon.'],
    maxlength: [400, 'Name cannot be more than 400 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость'],
    maxlength: [8, 'Стоимость не может превышать 999999,99 руб'],
  },
  // owner_name: {
  //   /* The owner of this pet */

  //   type: String,
  //   required: [true, "Please provide the pet owner's name"],
  //   maxlength: [20, "Owner's Name cannot be more than 60 characters"],
  // },
  // species: {
  //   /* The species of your pet */

  //   type: String,
  //   required: [true, 'Please specify the species of your pet.'],
  //   maxlength: [30, 'Species specified cannot be more than 40 characters'],
  // },
  // age: {
  //   /* Pet's age, if applicable */

  //   type: Number,
  // },
  // poddy_trained: {
  //   /* Boolean poddy_trained value, if applicable */

  //   type: Boolean,
  // },
  // diet: {
  //   /* List of dietary needs, if applicable */

  //   type: Array,
  // },
  image_url: {
    /* Url to pet image */

    required: [true, 'Пожалуйта укажите ссылу на картинку'],
    type: String,
  },
  types: {
    type: Array,
  },
  sets: {
    type: Array,
  },
  // likes: {
  //   /* List of things your pet likes to do */

  //   type: Array,
  // },
  // dislikes: {
  //   /* List of things your pet does not like to do */

  //   type: Array,
  // },
})

export default mongoose.models.Balloons ||
  mongoose.model('Balloons', BalloonsSchema)
