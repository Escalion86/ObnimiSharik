const setTypesSchema = {
  name: {
    type: String,
    required: [true, 'Введите название типа товара. Давай включи фантазию!'],
    maxlength: [100, 'Название типа товара не может превышать 100 смволов'],
    default: '',
  },
  description: {
    type: String,
    maxlength: [
      600,
      'Описание не может превышать 600 символов. Краткость - сестра таланта!',
    ],
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  cardSize: {
    type: String,
    default: 'normal', // big, small
  },
  archive: {
    type: Boolean,
    default: false,
  },
}

export default setTypesSchema
