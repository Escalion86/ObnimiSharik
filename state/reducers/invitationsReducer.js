import { SET_INVITATIONS } from 'state/constants'

const invitationsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_INVITATIONS:
      return action.invitations
    default:
      return state
  }
}

export default invitationsReducer
