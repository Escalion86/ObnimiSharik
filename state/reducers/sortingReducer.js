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
    name: 'по названию',
    price: 'по цене',
    count: 'по количеству',
    article: 'по артикулу',
  },
  sets: {
    name: 'по названию',
    price: 'по цене',
    count: 'по количеству',
    article: 'по артикулу',
  },
  productCirculations: {
    purchasedAt: 'по дате',
    count: 'по количеству',
  },
  productTypes: {
    name: 'по названию',
    count: 'по количеству',
  },
  setTypes: {
    name: 'по названию',
    count: 'по количеству',
  },
  users: {
    name: 'по имени',
    role: 'по должности',
  },
  invitations: {
    createdAt: 'по дате',
    role: 'по должности',
    status: 'по статусу',
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
