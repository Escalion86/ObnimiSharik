import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons'

const setsSchema = {
  article: {
    type: String,
    // maxlength: [20, 'Длинна артикула набора не может превышать 20 смволов'],
    default: '',
  },
  name: {
    type: String,
    required: [true, 'Введите название товара. Давай включи фантазию!'],
    maxlength: [100, 'Название товара не может превышать 100 смволов'],
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
  price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость'],
    min: [
      1,
      'Стоимость не может быть равна нулю. Ты его бесплатно раздаешь что-ли?',
    ],
    max: [
      99999999,
      'Стоимость не может превышать 999999,99 руб. Ты где такие цены видел?',
    ],
    dafeult: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  productsIdCount: {
    type: Map,
    of: Number,
    default: {},
  },
  typesId: {
    type: Array,
    default: [],
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

export default setsSchema
