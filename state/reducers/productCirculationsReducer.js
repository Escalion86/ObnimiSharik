import { SET_PRODUCT_CIRCULATIONS } from 'state/constants'

const productCirculationsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_CIRCULATIONS: {
      return action.productCirculations ?? state
    }
    default:
      return state
  }
}

export default productCirculationsReducer
