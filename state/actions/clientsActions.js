import { SET_CLIENTS } from 'state/constants'

export const setClients = (clients) => {
  return {
    type: SET_CLIENTS,
    clients,
  }
}
