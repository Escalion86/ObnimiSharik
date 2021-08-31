import { SET_PRODUCT_TYPES } from 'state/constants'

const productTypesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_TYPES:
      return action.productTypes
    default:
      return state
  }
}

export default productTypesReducer
