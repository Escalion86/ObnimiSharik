import { SET_SET_TYPES } from 'state/constants'

export const setSetTypes = (setTypes) => {
  return {
    type: SET_SET_TYPES,
    setTypes,
  }
}
