const productCirculationsSchema = {
  productId: {
    type: String,
    required: [
      true,
      'Необходимо указать товар. А то потом разбери что-куда вы там перекладываете....',
    ],
  },
  purchase: {
    type: Boolean,
    required: [
      true,
      'Пожалуйста выберите Пополнение или Расход. Или он в 4 измерении завис?',
    ],
    default: false,
  },
  count: {
    type: Number,
    required: [true, 'Пожалуйста укажите количество. Только честно!'],
    min: [1, 'Количество не может быть равно нулю. Воздухом торгуем чтоли?'],
    max: [
      999999,
      'Количество не может превышать 999999 шт. Что там за ангар у Вас?',
    ],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость'],
    default: 0,
  },
  orderId: {
    type: String,
  },
  defective: {
    type: Boolean,
    default: false,
  },
  purchasedAt: {
    type: Date,
    default: () => Date.now(),
  },
}

export default productCirculationsSchema
