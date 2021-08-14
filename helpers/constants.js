export const DEFAULT_USER = {
  name: 'Гость',
  email: '',
  phone: 0,
  whatsapp: 0,
  birthday: null,
  image: null,
  role: 'client',
}

export const CLIENT = {
  name: 'Гость',
  email: '',
  phone: 0,
  whatsapp: 0,
  birthday: null,
  image: null,
}

export const DEFAULT_PRODUCT = {
  article: '',
  name: '',
  description: '',
  price: 0,
  images: [],
  typesId: [],
  archive: false,
}

export const DEFAULT_SET = {
  article: '',
  name: '',
  description: '',
  price: 0,
  images: [],
  typesId: [],
  productsIdCount: [],
  archive: false,
}

export const DEFAULT_PRODUCT_TYPE = {
  name: '',
}

export const DEFAULT_SET_TYPE = {
  name: '',
}

export const DEFAULT_INVITATION = {
  email: '',
  role: '',
  status: 'created',
}

export const ROLES = [
  { name: 'Администратор', value: 'admin', hidden: false },
  { name: 'Аэродизайнер', value: 'aerodesigner', hidden: false },
  { name: 'Курьер', value: 'deliver', hidden: false },
  { name: 'Оператор', value: 'operator', hidden: false },
  { name: 'Разработчик', value: 'dev', hidden: true },
]

export const DEFAULT_PRODUCT_CIRCULATION = {
  productId: '',
  count: 1,
  orderId: '',
  purchase: false,
}
