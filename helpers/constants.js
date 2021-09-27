export const DEFAULT_USER = {
  name: 'Гость',
  email: '',
  phone: 0,
  whatsapp: 0,
  birthday: null,
  image: null,
  role: 'client',
}

export const DEFAULT_CLIENT = {
  name: '',
  email: '',
  phone: null,
  whatsapp: null,
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
  price: 0,
  count: 1,
  orderId: '',
  purchase: false,
  purchasedAt: new Date().toISOString(),
}

export const DEFAULT_DELIVERY_ADDRESS = {
  town: '',
  street: '',
  entrance: '',
  floor: '',
  flat: '',
  comment: '',
}

export const DEFAULT_ORDER = {
  // number: 0,
  clientId: '',
  productsCount: [],
  setsCount: [],
  discount: 0,
  fullPrice: 0,
  status: 'created',
  deliveryPickup: true,
  deliveryAddress: DEFAULT_DELIVERY_ADDRESS,
  deliveryDateFrom: new Date().toISOString(),
  deliveryDateTo: new Date().toISOString(),
  deliverId: '',
}

export const DEFAULT_PAYMENT = {
  number: 0,
  clientId: '',
  orderId: '',
  way: 'card',
  sum: 0,
  status: 'created',
  payAt: new Date().toISOString(),
}
