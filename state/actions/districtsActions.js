import { SET_DISTRICTS } from 'state/constants'

export const setDistricts = (district) => {
  return {
    type: SET_DISTRICTS,
    district,
  }
}
