import { SET_DISTRICTS } from 'state/constants'

export const setDistricts = (districts) => {
  return {
    type: SET_DISTRICTS,
    districts,
  }
}
