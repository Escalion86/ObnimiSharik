import { SET_PAYMENTS } from 'state/constants'

export const setPayments = (payments) => {
  return {
    type: SET_PAYMENTS,
    payments,
  }
}
