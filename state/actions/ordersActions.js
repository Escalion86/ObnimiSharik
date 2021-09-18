import { SET_ORDERS } from 'state/constants'

export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  }
}
