import addCountToProducts from '@helpers/addCountToProducts'
import { SET_PRODUCTS, ADD_COUNT_TO_PRODUCTS } from 'state/constants'

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_COUNT_TO_PRODUCTS:
      return addCountToProducts(state)
    case SET_PRODUCTS:
      if (action.addCount) return addCountToProducts(action.products)
      else return action.products
    default:
      return state
  }
}

export default productsReducer
