const ordersSchema = {
  clientId: {
    type: String,
    required: [
      true,
      'Необходимо указать клиента. А то с кем потом связываться то? С Папой Римским?',
    ],
  },
  productsCount: {
    type: Array,
    default: [],
  },
  setsCount: {
    type: Array,
    default: [],
  },
  discount: {
    type: Number,
    default: 0,
    max: [
      99999999,
      'Скидка не может превышать 999999,99 руб. Решил из своих карманных доплатить, чтобы купили?',
    ],
  },
  price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость'],
    max: [
      99999999,
      'Стоимость не может превышать 999999,99 руб. Ты где такие цены видел? В автосалонах?',
    ],
    default: 0,
  },
  status: {
    type: String,
    default: 'created',
  },
  comment: {
    type: String,
    default: '',
  },
  photos: {
    type: Array,
    default: [],
  },
  deliveryPickup: {
    type: Boolean,
    default: true,
  },
  deliveryPrice: {
    type: Number,
    default: 0,
    maxlength: [
      8,
      'Стоимость доставки не может превышать 999999,99 руб. Ты на другую планету чтоли доставляешь?',
    ],
  },
  deliveryAddress: {
    type: Object,
  },
  deliveryDateFrom: {
    type: Date,
    default: Date.now,
  },
  deliveryDateTo: {
    type: Date,
    default: Date.now,
  },
  deliverId: {
    type: String,
  },
  aerodesignerId: {
    type: String,
  },
  operatorId: {
    type: String,
  },
}

export default ordersSchema
