import {
  // SET_INVITATIONS_FILTER,
  // SET_PRODUCTS_FILTER,
  // SET_PRODUCT_CIRCULSTIONS_FILTER,
  // SET_PRODUCT_TYPES_FILTER,
  // SET_SETS_FILTER,
  // SET_SET_TYPES_FILTER,
  // SET_USERS_FILTER,
  SET_FILTER,
} from 'state/constants'

export const initialState = {
  products: {
    productTypes: null,
    price: [null, null],
    count: [null, null],
  },
  sets: {
    setTypes: null,
    price: [null, null],
    count: [null, null],
  },
  productCirculations: {
    purchase: [true, true],
    count: [null, null],
  },
  productTypes: {},
  setTypes: {},
  users: {},
  invitations: {},
  orders: {
    price: [null, null],
    status: null,
  },
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, ...action.data }
    // case SET_PRODUCTS_FILTER:
    //   return { ...state, products: action.data }
    // case SET_SETS_FILTER:
    //   return { ...state, sets: action.data }
    // case SET_PRODUCT_CIRCULSTIONS_FILTER:
    //   return { ...state, productCirculations: action.data }
    // case SET_PRODUCT_TYPES_FILTER:
    //   return { ...state, productTypes: action.data }
    // case SET_SET_TYPES_FILTER:
    //   return { ...state, setTypes: action.data }
    // case SET_USERS_FILTER:
    //   return { ...state, users: action.data }
    // case SET_INVITATIONS_FILTER:
    //   return { ...state, invitations: action.data }
    default:
      return state
  }
}

export default filterReducer
