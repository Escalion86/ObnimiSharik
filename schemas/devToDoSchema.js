const devToDoSchema = {
  title: {
    type: String,
    required: [
      true,
      'Введите заголовок. Ну парой слов опиши ситуацию - сложно чтоли?',
    ],
    maxlength: [
      100,
      'Заголовок не может быть больше 100 символов. Тебе описание для чего?',
    ],
  },
  description: {
    type: String,
    required: [
      true,
      'Введите описание. Вот как делать то - не знаю что! В чем проблема то?',
    ],
    maxlength: [
      600,
      'Описание не может быть больше 600 символов. Ты там поэму пишешь?',
    ],
  },
  images: {
    type: Array,
    default: [],
  },
  userId: {
    type: String,
    required: [true, 'Необходимо указать заявителя'],
  },
  status: {
    type: String, // created, inProgress, finished
    required: [true, 'Введите статус'],
    default: 'created',
  },
  priority: {
    type: Number,
    required: [
      true,
      'Введите приоритет. А то нулевой приоритет - это такое...',
    ],
    default: null,
  },
  finishedAt: {
    type: Date,
    default: null,
  },
  archive: {
    type: Boolean,
    default: false,
  },
}

export default devToDoSchema
