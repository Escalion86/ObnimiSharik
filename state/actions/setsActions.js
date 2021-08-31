import { SET_SETS, ADD_COUNT_TO_SETS } from 'state/constants'

export const setSets = (sets, addCount = false) => {
  return {
    type: SET_SETS,
    sets,
    addCount,
  }
}

export const addCountToSets = () => {
  return {
    type: ADD_COUNT_TO_SETS,
  }
}
