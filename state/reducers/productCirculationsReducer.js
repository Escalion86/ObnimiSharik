import { SET_PRODUCT_CIRCULATIONS } from 'state/constants'

const productCirculationsReducer = (state = [], action) => {
  switch (action.type) {
    // case ADD_PRODUCT:
    //   return (state = { ...state, logged_in: true })
    // case 'EDIT_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    // case 'DELETE_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    case SET_PRODUCT_CIRCULATIONS: {
      return action.productCirculations
    }
    default:
      return state
  }
}

export default productCirculationsReducer
