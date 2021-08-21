import { SET_INVITATIONS } from 'state/constants'

const invitationsReducer = (state = [], action) => {
  switch (action.type) {
    // case ADD_PRODUCT:
    //   return (state = { ...state, logged_in: true })
    // case 'EDIT_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    // case 'DELETE_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    case SET_INVITATIONS:
      return action.invitations
    default:
      return state
  }
}

export default invitationsReducer
