import { SET_NOTIFICATIONS, SET_NOTIFICATIONS } from 'state/constants'

export const setDistricts = (notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    notifications,
  }
}
