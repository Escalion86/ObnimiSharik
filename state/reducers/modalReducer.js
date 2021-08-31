import { SET_MODAL, REMOVE_MODAL } from 'state/constants'

const modalReducer = (state = [], action) => {
  switch (action.type) {
    case REMOVE_MODAL:
      return null
    case SET_MODAL:
      return action.modal
    default:
      return state
  }
}

export default modalReducer
