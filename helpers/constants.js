import {
  faMars,
  faMoneyBill,
  faSign,
  faVenus,
  faCreditCard,
  faSignInAlt,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'
import isDevMode from './isDevMode'

export const DEFAULT_USER = {
  name: 'Гость',
  email: '',
  phone: null,
  whatsapp: null,
  viber: null,
  telegram: null,
  vk: null,
  instagram: null,
  birthday: null,
  gender: null,
  image: null,
  role: 'client',
}

export const DEFAULT_CLIENT = {
  name: '',
  email: '',
  phone: null,
  whatsapp: null,
  viber: null,
  telegram: null,
  vk: null,
  instagram: null,
  birthday: null,
  gender: null,
  image: null,
}

export const DEFAULT_PRODUCT = {
  article: '',
  name: '',
  description: '',
  price: 0,
  manufacturer: '',
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
  description: '',
  image: '',
  cardSize: 'normal', // big, small
}

export const DEFAULT_SET_TYPE = {
  name: '',
  description: '',
  image: '',
  cardSize: 'normal', // big, small
}

export const DEFAULT_INVITATION = {
  email: '',
  role: '',
  status: 'created',
}

export const DEFAULT_DEVTODO = {
  // number: 0,
  title: '',
  description: '',
  images: [],
  userId: null,
  status: 'created',
  priority: null,
  finishedAt: null,
}

export const ROLES = [
  { name: 'Администратор', value: 'admin', hidden: false },
  { name: 'Аэродизайнер', value: 'aerodesigner', hidden: false },
  { name: 'Курьер', value: 'deliver', hidden: false },
  { name: 'Оператор', value: 'operator', hidden: false },
  { name: 'Разработчик', value: 'dev', hidden: true },
]

export const ORDER_STATUSES = [
  {
    name: 'Черновик',
    value: 'draft',
    roles: ['operator', 'admin'],
    color: 'bg-gray-200',
  },
  {
    name: 'Передан аэродизайнеру',
    value: 'aerodesigner',
    roles: ['operator', 'aerodesigner', 'deliver', 'admin'],
    requirements: { deliveryPickup: false },
    color: 'bg-blue-200',
  },
  {
    name: 'Товар отложен',
    value: 'deferred',
    roles: ['operator', 'aerodesigner', 'deliver', 'admin'],
    requirements: { deliveryPickup: false, productCirculationsIdCount: true },
    color: 'bg-blue-300',
  },
  {
    name: 'Передан аэродизайнеру',
    value: 'aerodesigner',
    roles: ['operator', 'aerodesigner', 'admin'],
    requirements: { deliveryPickup: true },
    color: 'bg-blue-200',
    notInFilter: true,
  },
  {
    name: 'Товар отложен',
    value: 'deferred',
    roles: ['operator', 'aerodesigner', 'admin'],
    requirements: { deliveryPickup: true, productCirculationsIdCount: true },
    color: 'bg-blue-300',
    notInFilter: true,
  },
  {
    name: 'Готов к выдаче',
    value: 'readyForReceive',
    roles: ['operator', 'aerodesigner', 'admin'],
    requirements: { deliveryPickup: true, productCirculationsIdCount: true },
    color: 'bg-green-200',
  },
  {
    name: 'Готов к доставке',
    value: 'readyForDelivery',
    roles: ['operator', 'aerodesigner', 'deliver', 'admin'],
    requirements: { deliveryPickup: false, productCirculationsIdCount: true },
    color: 'bg-yellow-200',
  },
  {
    name: 'Доставляется',
    value: 'deliveryInProcess',
    roles: ['operator', 'deliver', 'admin'],
    requirements: { deliveryPickup: false, productCirculationsIdCount: true },
    color: 'bg-yellow-400',
  },
  {
    name: 'Доставлен',
    value: 'delivered',
    roles: ['operator', 'deliver', 'admin'],
    requirements: { deliveryPickup: false, productCirculationsIdCount: true },
    color: 'bg-green-300',
  },
  {
    name: 'Получен',
    value: 'recived',
    roles: ['operator', 'admin'],
    requirements: { deliveryPickup: true, productCirculationsIdCount: true },
    color: 'bg-green-300',
  },
  {
    name: 'Выполнен',
    value: 'completed',
    roles: ['operator', 'admin'],
    requirements: { productCirculationsIdCount: true },
    color: 'bg-green-400',
  },
  {
    name: 'Отменен',
    value: 'canceled',
    roles: ['operator', 'admin'],
    color: 'bg-red-400',
  },
]

export const DEFAULT_PRODUCT_CIRCULATION = {
  productId: '',
  price: 0,
  count: 1,
  orderId: '',
  purchase: true,
  purchasedAt: null,
  defective: false,
}

export const DEFAULT_DELIVERY_ADDRESS = {
  town: '',
  street: '',
  house: '',
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
  price: 0,
  status: 'draft',
  comment: '',
  photos: [],
  deliveryPrice: 0,
  deliveryPickup: true,
  deliveryAddress: DEFAULT_DELIVERY_ADDRESS,
  deliveryDateFrom: null,
  deliveryDateTo: null,
  deliverId: '',
  aerodesignerId: '',
  operatorId: '',
}

export const DEFAULT_PAYMENT = {
  // number: 0,
  clientId: '',
  orderId: '',
  payType: null,
  sum: 0,
  status: 'created',
  payAt: null,
}

export const PRIORITIES = [
  { value: 0, name: 'Низкий', color: 'green' },
  { value: 1, name: 'Обычный', color: 'yellow' },
  { value: 2, name: 'Высокий', color: 'red' },
]

export const GENDERS = [
  { value: 'male', name: 'Мужчина', color: 'blue', icon: faMars },
  { value: 'famale', name: 'Женщина', color: 'red', icon: faVenus },
]

export const ORDER_PURCHASE = [
  { value: true, name: 'Пополнение склада', color: 'green', icon: faPlus },
  { value: false, name: 'Расход со склада', color: 'red', icon: faMinus },
]

export const DEVTODO_STATUSES = [
  { value: 'created', name: 'Создана', color: 'gray' },
  { value: 'inProgress', name: 'В работе', color: 'yellow' },
  { value: 'finished', name: 'Исполнена', color: 'green' },
  { value: 'declined', name: 'Отклонена', color: 'red' },
]

export const PAY_TYPES = [
  { value: 'card', name: 'Картой', color: 'blue', icon: faCreditCard },
  { value: 'cash', name: 'Наличными', color: 'green', icon: faMoneyBill },
  { value: 'remittance', name: 'Перевод', color: 'yellow', icon: faSignInAlt },
]

export const DEFAULT_DISTRICT = {
  name: '',
  deliveryPrice: 0,
}

export const CLOUDINARY_FOLDER = isDevMode ? 'obnimisharik_dev' : 'obnimisharik'
