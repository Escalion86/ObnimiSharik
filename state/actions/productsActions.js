import { SET_PRODUCTS } from 'state/constants'

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  }
}
