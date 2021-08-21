import { SET_SETS } from 'state/constants'

export const setSets = (sets) => {
  return {
    type: SET_SETS,
    sets,
  }
}
