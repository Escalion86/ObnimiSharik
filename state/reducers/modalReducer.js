import { SET_MODAL, REMOVE_MODAL } from 'state/constants'

const modalReducer = (state = [], action) => {
  switch (action.type) {
    // case ADD_PRODUCT:
    //   return (state = { ...state, logged_in: true })
    // case 'EDIT_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    // case 'DELETE_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    // case REMOVE_ALL_MODALS:
    //   return []
    case REMOVE_MODAL:
      return null
    case SET_MODAL:
      return action.modal
    default:
      return state
  }
}

export default modalReducer
