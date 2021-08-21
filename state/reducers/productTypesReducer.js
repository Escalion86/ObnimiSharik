import { SET_PRODUCT_TYPES } from 'state/constants'

const productTypesReducer = (state = [], action) => {
  switch (action.type) {
    // case ADD_PRODUCT:
    //   return (state = { ...state, logged_in: true })
    // case 'EDIT_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    // case 'DELETE_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    case SET_PRODUCT_TYPES:
      return action.productTypes
    default:
      return state
  }
}

export default productTypesReducer
