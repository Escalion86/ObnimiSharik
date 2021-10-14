import { SET_ORDERS } from 'state/constants'

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders ?? state
    default:
      return state
  }
}

export default ordersReducer
