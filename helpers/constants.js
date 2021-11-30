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

export const COLORS_FOR_TAILWIND = [
  'bg-red-500',
  'bg-red-300',
  'bg-red-400',
  'text-red-500',
  'text-red-300',
  'text-red-400',
  'border-red-500',
  'border-red-300',
  'border-red-400',
  'bg-green-500',
  'bg-green-300',
  'bg-green-400',
  'text-green-500',
  'text-green-300',
  'text-green-400',
  'border-green-500',
  'border-green-300',
  'border-green-400',
  'bg-blue-500',
  'bg-blue-300',
  'bg-blue-400',
  'text-blue-500',
  'text-blue-300',
  'text-blue-400',
  'border-blue-500',
  'border-blue-300',
  'border-blue-400',
  'bg-yellow-500',
  'bg-yellow-300',
  'bg-yellow-400',
  'text-yellow-500',
  'text-yellow-300',
  'text-yellow-400',
  'border-yellow-500',
  'border-yellow-300',
  'border-yellow-400',
]

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
  subRoles: [],
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
  showOnSite: false,
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
  showOnSite: false,
}

export const DEFAULT_PRODUCT_TYPE = {
  name: '',
  description: '',
  image: '',
  cardSizeOnSite: 'normal', // big, small
  archive: false,
  showOnSite: false,
}

export const DEFAULT_SET_TYPE = {
  name: '',
  description: '',
  image: '',
  cardSizeOnSite: 'normal', // big, small
  archive: false,
  showOnSite: false,
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
  archive: false,
}

export const ROLES = [
  { name: 'Администратор', value: 'admin', hidden: false, canBeSubRole: false },
  {
    name: 'Аэродизайнер',
    value: 'aerodesigner',
    hidden: false,
    canBeSubRole: true,
  },
  { name: 'Курьер', value: 'deliver', hidden: false, canBeSubRole: true },
  { name: 'Оператор', value: 'operator', hidden: false, canBeSubRole: true },
  { name: 'Разработчик', value: 'dev', hidden: true, canBeSubRole: false },
]

export const ORDER_STATUSES = [
  {
    name: 'Черновик',
    value: 'draft',
    roles: ['operator', 'admin', 'dev'],
    color: 'gray-400',
  },
  {
    name: 'Передан аэродизайнеру',
    value: 'aerodesigner',
    roles: ['operator', 'aerodesigner', 'deliver', 'admin', 'dev'],
    color: 'blue-300',
  },
  {
    name: 'Товар отложен',
    value: 'deferred',
    roles: ['operator', 'aerodesigner', 'deliver', 'admin', 'dev'],
    requirements: { productCirculationsIdCount: true },
    color: 'blue-400',
  },
  {
    name: 'Готов к выдаче',
    value: 'readyForReceive',
    roles: ['operator', 'aerodesigner', 'admin', 'dev'],
    requirements: { deliveryPickup: true, productCirculationsIdCount: true },
    color: 'green-300',
  },
  {
    name: 'Готов к доставке',
    value: 'readyForDelivery',
    roles: ['operator', 'aerodesigner', 'deliver', 'admin', 'dev'],
    requirements: { deliveryPickup: false, productCirculationsIdCount: true },
    color: 'yellow-300',
  },
  {
    name: 'Доставляется',
    value: 'deliveryInProcess',
    roles: ['operator', 'deliver', 'admin', 'dev'],
    requirements: { deliveryPickup: false, productCirculationsIdCount: true },
    color: 'yellow-500',
  },
  {
    name: 'Доставлен',
    value: 'delivered',
    roles: ['operator', 'deliver', 'admin', 'dev'],
    requirements: { deliveryPickup: false, productCirculationsIdCount: true },
    color: 'green-400',
  },
  {
    name: 'Получен',
    value: 'recived',
    roles: ['operator', 'admin', 'dev'],
    requirements: { deliveryPickup: true, productCirculationsIdCount: true },
    color: 'green-400',
  },
  {
    name: 'Выполнен',
    value: 'completed',
    roles: ['operator', 'admin', 'dev'],
    requirements: { productCirculationsIdCount: true },
    color: 'green-500',
  },
  {
    name: 'Отменен',
    value: 'canceled',
    roles: ['operator', 'admin', 'dev'],
    color: 'red-500',
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
  town: 'Красноярск',
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
  { value: 0, name: 'Низкий', color: 'green-400' },
  { value: 1, name: 'Обычный', color: 'yellow-400' },
  { value: 2, name: 'Высокий', color: 'red-400' },
]

export const GENDERS = [
  { value: 'male', name: 'Мужчина', color: 'blue-400', icon: faMars },
  { value: 'famale', name: 'Женщина', color: 'red-400', icon: faVenus },
]

export const ORDER_PURCHASE = [
  { value: true, name: 'Пополнение склада', color: 'green-400', icon: faPlus },
  { value: false, name: 'Расход со склада', color: 'red-400', icon: faMinus },
]

export const DEVTODO_STATUSES = [
  { value: 'created', name: 'Создана', color: 'gray-400' },
  { value: 'inProgress', name: 'В работе', color: 'yellow-400' },
  { value: 'finished', name: 'Исполнена', color: 'green-400' },
  { value: 'declined', name: 'Отклонена', color: 'red-400' },
]

export const PAY_TYPES = [
  { value: 'card', name: 'Картой', color: 'blue-400', icon: faCreditCard },
  { value: 'cash', name: 'Наличными', color: 'green-400', icon: faMoneyBill },
  {
    value: 'remittance',
    name: 'Перевод',
    color: 'yellow-400',
    icon: faSignInAlt,
  },
]

export const DEFAULT_DISTRICT = {
  name: '',
  deliveryPrice: 0,
}

export const CLOUDINARY_FOLDER = isDevMode ? 'obnimisharik_dev' : 'obnimisharik'
