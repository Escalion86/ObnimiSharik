const paymentsSchema = {
  clientId: {
    type: String,
    required: [
      true,
      'Необходимо указать клиента. А то с кем потом связываться то? С Папой Римским?',
    ],
  },
  orderId: {
    type: String,
    required: [
      true,
      'Необходимо указать заказ. Или ты просто так решил прикарманить?',
    ],
  },
  payType: {
    type: String,
    required: [
      true,
      'Необходимо указать тип оплаты. Не бартером же с тобой расплатились...',
    ],
    default: 'cash',
  },
  sum: {
    type: Number,
    min: [
      1,
      'Сумма не может быть равна нулю. Или ты из своих карманных расплатился?',
    ],
    max: [
      99999999,
      'Сумма не может превышать 999999,99 руб. Или ты в черную работаешь?',
    ],
    default: null,
  },
  status: {
    type: String,
    required: [true, 'Необходимо указать статус'],
    default: 'created',
  },
  payAt: {
    type: Date,
    default: Date.now,
  },
}

export default paymentsSchema
