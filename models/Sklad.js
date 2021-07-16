import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const SkladSchema = new mongoose.Schema({
  product_id: {
    type: String,
    // required: [true, 'Please provide a name for this baloon.'],
    // maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  purchase: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость за штуку'],
    maxlength: [8, 'Стоимость не может превышать 999999,99 руб'],
  },
  count: {
    type: Number,
    required: [true, 'Пожалуйста укажите количество'],
    maxlength: [8, 'Стоимость не может превышать 999999,99 руб'],
  },
  date: {
    type: Date,
    default: Date.now,
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
