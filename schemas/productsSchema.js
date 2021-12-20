const productsSchema = {
  article: {
    type: String,
    // maxlength: [20, 'Длинна артикула товара не может превышать 20 смволов'],
    default: '',
  },
  name: {
    type: String,
    required: [true, 'Введите название товара. Давай включи фантазию!'],
    maxlength: [100, 'Название товара не может превышать 100 смволов'],
    default: null,
  },
  description: {
    type: String,
    maxlength: [
      600,
      'Описание не может превышать 600 символов. Краткость - сестра таланта!',
    ],
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость'],
    // maxlength: [8, 'Стоимость не может превышать 999999,99 руб'],
    min: [
      1,
      'Стоимость не может быть равна нулю. Ты его бесплатно раздаешь что-ли?',
    ],
    max: [
      99999999,
      'Стоимость не может превышать 999999,99 руб. Ты где такие цены видел?',
    ],
    default: null,
  },
  images: {
    type: Array,
    default: [],
  },
  typesId: {
    type: Array,
    default: [],
  },
  manufacturer: {
    type: String,
    maxlength: [100, 'Название производителя не может превышать 100 символов'],
    default: '',
  },
  archive: {
    type: Boolean,
    default: false,
  },
  showOnSite: {
    type: Boolean,
    default: false,
  },
}

export default productsSchema
