import {
  SET_INVITATIONS_FILTER,
  SET_PRODUCTS_FILTER,
  SET_PRODUCT_CIRCULSTIONS_FILTER,
  SET_PRODUCT_TYPES_FILTER,
  SET_SETS_FILTER,
  SET_SET_TYPES_FILTER,
  SET_USERS_FILTER,
  SET_SORTING,
} from 'state/constants'

export const sortingVariables = {
  products: {
    name: { text: 'по названию', type: String },
    price: { text: 'по цене', type: Number },
    count: { text: 'по количеству', type: Number },
    article: { text: 'по артикулу', type: String },
  },
  sets: {
    name: { text: 'по названию', type: String },
    price: { text: 'по цене', type: Number },
    count: { text: 'по количеству', type: Number },
    article: { text: 'по артикулу', type: String },
  },
  productCirculations: {
    purchasedAt: { text: 'по дате', type: Date },
    count: { text: 'по количеству', type: Number },
  },
  productTypes: {
    name: { text: 'по названию', type: String },
    count: { text: 'по количеству', type: Number },
  },
  setTypes: {
    name: { text: 'по названию', type: String },
    count: { text: 'по количеству', type: Number },
  },
  users: {
    name: { text: 'по имени', type: String },
    role: { text: 'по должности', type: String },
  },
  invitations: {
    createdAt: { text: 'по дате', type: Date },
    role: { text: 'по должности', type: String },
    status: { text: 'по статусу', type: String },
  },
  orders: {
    deliveryDateFrom: { text: 'по дате', type: Date },
    price: { text: 'по стоимости', type: Number },
    // status: 'по статусу',
  },
  payments: {
    payAt: { text: 'по дате', type: Date },
    // fullPrice: 'по стоимости',
    // status: 'по статусу',
  },
}

export const initialState = {
  products:
    // name, price, count
    ['name', 'ASC'], // ASC - от меньшего к большему, DESC - от большего к меньшему (умолч)
  sets:
    // name, price, count
    ['name', 'ASC'],
  productCirculations:
    // data, count
    ['purchasedAt', 'DESC'],
  productTypes: ['name', 'ASC'],
  // name, count
  setTypes: ['name', 'ASC'],
  // name, role
  users: ['name', 'ASC'],
  // date, role,status
  invitations: ['createdAt', 'DESC'],
  orders: ['deliveryDateFrom', 'DESC'],
  payments: ['payAt', 'DESC'],
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORTING:
      return { ...state, ...action.data }
    default:
      return state
  }
}

export default filterReducer
