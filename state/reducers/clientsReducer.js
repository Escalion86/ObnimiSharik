import { SET_CLIENTS } from 'state/constants'

const clientsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CLIENTS:
      return action.clients
    default:
      return state
  }
}

export default clientsReducer
