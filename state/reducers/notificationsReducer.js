import { SET_NOTIFICATIONS } from 'state/constants'

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.notifications ?? state
    default:
      return state
  }
}

export default notificationsReducer
