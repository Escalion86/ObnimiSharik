import { SET_PRODUCTS, ADD_COUNT_TO_PRODUCTS } from 'state/constants'

export const setProducts = (products, addCount = false) => {
  return {
    type: SET_PRODUCTS,
    products,
    addCount,
  }
}

export const addCountToProducts = () => {
  return {
    type: ADD_COUNT_TO_PRODUCTS,
  }
}
