import addCountToSets from '@helpers/addCountToSets'
import { SET_SETS, ADD_COUNT_TO_SETS } from 'state/constants'

const setsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_COUNT_TO_SETS:
      return addCountToSets(state)
    case SET_SETS:
      if (action.addCount) return addCountToSets(action.sets ?? state)
      else return action.sets ?? state
    default:
      return state
  }
}

export default setsReducer
