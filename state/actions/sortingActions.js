import { SET_SORTING } from 'state/constants'

export const setSorting = (data) => {
  return {
    type: SET_SORTING,
    data,
  }
}
