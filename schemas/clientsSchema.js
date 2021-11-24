const clientsSchema = {
  name: {
    type: String,
    required: [
      true,
      'Введите Имя клиента. Или можешь написать "?", раз неудосужился спросить...',
    ],
    maxlength: [
      100,
      'Имя не может быть больше 100 символов. Он с другой планеты чтоли?',
    ],
    default: 'Шарик Обнимашкин',
  },
  email: {
    type: String,
    lowercase: true,
  },
  image: {
    type: String,
    default: null,
  },
  phone: {
    type: Number,
    required: [
      true,
      'Введите номер телефона. Да это обязательно и не спрашивай почему!',
    ],
    default: null,
    min: [
      10000000000,
      'Введен некорректный нормер телефона. Ты же понимаешь что речь идет не о номере модели твоей Nokia?',
    ],
    max: [
      99999999999,
      'Введен некорректный нормер телефона. Ты же понимаешь что речь идет не о номере модели твоей Nokia?',
    ],
  },
  whatsapp: {
    type: Number,
    default: null,
    min: [
      10000000000,
      'Введен некорректный нормер whatsapp. Ты же понимаешь что речь идет не о номере модели твоей Nokia?',
    ],
    max: [
      99999999999,
      'Введен некорректный нормер whatsapp. Ты же понимаешь что речь идет не о номере модели твоей Nokia?',
    ],
  },
  viber: {
    type: Number,
    default: null,
    min: [
      10000000000,
      'Введен некорректный нормер viber. Ты же понимаешь что речь идет не о номере модели твоей Nokia?',
    ],
    max: [
      99999999999,
      'Введен некорректный нормер viber. Ты же понимаешь что речь идет не о номере модели твоей Nokia?',
    ],
  },
  telegram: {
    type: String,
    default: null,
  },
  instagram: {
    type: String,
    default: null,
  },
  vk: {
    type: String,
    default: null,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
    default: null,
  },
}

export default clientsSchema
