const versionHistory = [
  {
    ver: '0.10',
    date: '2021-11-22T16:28:00+07:00',
    fix: [
      'Ошибка позваляющая сохранять карточку движения товара без указания, что это Покупка или Продажа',
      'При обновлении формы заказа, если был изменен его состав - его суммарная стоимость не изменялась',
    ],
  },
  {
    ver: '0.09b',
    date: '2021-11-22T16:28:00+07:00',
    fix: [
      'Исправлена ошибка возникающая если в форме заказа в списке товаров оставить пустую строку и сохранить заказ',
    ],
  },
  {
    ver: '0.09a',
    emergency: true,
    date: '2021-11-21T23:10:00+07:00',
    problem: [
      'Временно отключены уведомления, так как возникает проблема с входом в другую учетную запись',
    ],
  },
  {
    ver: '0.09',
    date: '2021-11-21T11:10:00+07:00',
    fix: [
      'После подтверждения изменений (или создания) в форме, кнопка сразу блокируется во избежание повторного нажатия. Раньше это приводило к созданию нескольких одинаковых карточек',
      'Исправлен поиск артикулов содержащих буквы',
      'При создании карточек движений товаров теперь корректно записывается дата пополнения с учетом времени создания самой карточки, таким образом каждая новая созданная карточка будет вверху списка если он отфильтрован по дате по убыванию',
    ],
  },
  {
    ver: '0.08',
    date: '2021-11-20T20:20:00+07:00',
    add: [
      'Если в форме были изменения, то теперь при закрытии формы появится оповещение, что данные изменения не сохранены и уверены ли вы, что хотите закрыть форму',
    ],
    update: [
      'Существенно обновлена форма движения товаров, а также добавлена возможность ввода стоимость 1 шт товара',
    ],
    fix: ['Ошибка доступа к редактированию некоторых форм'],
  },
  {
    ver: '0.07',
    date: '2021-11-20T00:20:00+07:00',
    add: ['Поле "Производитель" для товаров'],
    update: [
      'Переделана проверка форм на корректность заполнения. Теперь при некорректно заполненом поле будет появляться соответствующее оповещение',
      'Улучшен стиль отображения форм и некоторых карточек',
      'При создании новой карточки движения товара, поле "Пополнение/Расход" по умолчанию выстаяляется как "Пополнение склада" (было как "Расход")',
    ],
    fix: ['Ошибка отображения количества товаров и наборов в наличии'],
  },
  {
    ver: '0.06',
    date: '2021-11-18T16:26:00+07:00',
    update: [
      'Проработаны права доступа для всех форм. Теперь возможность просмотра и редактирования зависит от роли',
    ],
    fix: ['Исправление ошибок стиля'],
  },
  {
    ver: '0.05',
    date: '2021-11-17T03:25:00+07:00',
    update: [
      'Проработаны права доступа. Теперь просмотр/создание/редактирование/удаление карточек зависит от роли',
    ],
    fix: [
      'Исправлена ошибка цвета в карточке Движения товара. Теперь при пополнении склада - зеленый, а при расходе - красный (было наоборот)',
      'Исправление мелких ошибок',
    ],
  },
  {
    ver: '0.04',
    date: '2021-11-11T22:05:00+07:00',
    add: [
      'Добавлены уведомления об изменениях в базе данных (колокольчик в шапке)',
    ],
    update: ['Обновлена форма движения товара'],
    fix: [
      'Исправлена ошибка при очистке числового поля',
      'Исправлена ошибка фильтра заказов',
      'Исправление мелких ошибок',
    ],
  },
  {
    ver: '0.03',
    date: '2021-11-03T16:26:00+07:00',
    fix: [
      'Исправлена ошибка вылета из меню "Сотрудники"',
      'Исправление множества мелких визуальных ошибок',
    ],
  },
  {
    ver: '0.02',
    date: '2021-11-03T01:52:00+07:00',
    add: [
      'Добавлено оповещение об изменениях версий (собственно вы на него и смотрите), в нем будут оглашаться наиболее значимые изменения и обновления',
      'Добавлен выбор ответственного оператора в форме заказа',
    ],
    update: [
      'Стоимость теперь вводится с копейками',
      'Обновлена форма заказа',
      'Обновлен логотип на боковой панели',
    ],
  },
]

export default versionHistory
