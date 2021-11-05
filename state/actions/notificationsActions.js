import { SET_NOTIFICATIONS } from 'state/constants'

export const setNotifications = (notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    notifications,
  }
}
