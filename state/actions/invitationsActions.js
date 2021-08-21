import { SET_INVITATIONS } from 'state/constants'

export const setInvitations = (invitations) => {
  return {
    type: SET_INVITATIONS,
    invitations,
  }
}
