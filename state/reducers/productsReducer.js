import { SET_PRODUCTS } from 'state/constants'

const productsReducer = (state = [], action) => {
  switch (action.type) {
    // case ADD_PRODUCT:
    //   return (state = { ...state, logged_in: true })
    // case 'EDIT_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    // case 'DELETE_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
