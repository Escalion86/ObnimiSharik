import { SET_SORTING } from 'state/constants'

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
    price: { text: 'по цене', type: Number },
    count: { text: 'по кол-ву товара', type: Number },
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
    sum: { text: 'по сумме', type: Number },
    // status: 'по статусу',
  },
  clients: {
    name: { text: 'по имени', type: String },
  },
  districts: {
    name: { text: 'по названию', type: String },
    deliveryPrice: { text: 'по стоимости', type: Number },
    // status: 'по статусу',
  },
}

export const initialState = {
  products: ['name', 'ASC'], // ASC - от меньшего к большему, DESC - от большего к меньшему (умолч)
  sets: ['name', 'ASC'],
  productCirculations: ['purchasedAt', 'DESC'],
  productTypes: ['name', 'ASC'],
  setTypes: ['name', 'ASC'],
  users: ['name', 'ASC'],
  clients: ['name', 'ASC'],
  invitations: ['createdAt', 'DESC'],
  orders: ['deliveryDateFrom', 'DESC'],
  payments: ['payAt', 'DESC'],
  districts: ['name', 'ASC'],
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
