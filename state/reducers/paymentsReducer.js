import { SET_PAYMENTS } from 'state/constants'

const paymentsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PAYMENTS:
      return action.payments
    default:
      return state
  }
}

export default paymentsReducer
