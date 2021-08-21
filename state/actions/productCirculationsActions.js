import { SET_PRODUCT_CIRCULATIONS } from 'state/constants'

export const setProductCirculations = (productCirculations) => {
  return {
    type: SET_PRODUCT_CIRCULATIONS,
    productCirculations,
  }
}
