import { SET_PRODUCT_TYPES } from 'state/constants'

export const setProductTypes = (productTypes) => {
  return {
    type: SET_PRODUCT_TYPES,
    productTypes,
  }
}
