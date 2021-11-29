const districtsSchema = {
  name: {
    type: String,
    required: [true, 'Введите название района. Это же не Гетто?'],
    maxlength: [
      100,
      'Название района не может превышать 100 смволов. Это где такие названия ты нашел?',
    ],
    default: '',
  },
  deliveryPrice: {
    type: Number,
    required: [true, 'Пожалуйста укажите стоимость доставки в район'],
    max: [
      99999999,
      'Стоимость доставки не может превышать 999999,99 руб. Ты на другую планету чтоли доставляешь?',
    ],
    default: 0,
  },
  svg: {
    d: String,
    textX: Number,
    textY: Number,
  },
}

export default districtsSchema
