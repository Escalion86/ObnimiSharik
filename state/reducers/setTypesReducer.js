import { SET_SET_TYPES } from 'state/constants'

const setTypesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SET_TYPES:
      return action.setTypes
    default:
      return state
  }
}

export default setTypesReducer
