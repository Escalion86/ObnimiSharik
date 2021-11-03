import { SET_DISTRICTS } from 'state/constants'

const districtsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_DISTRICTS:
      return action.districts ?? state
    default:
      return state
  }
}

export default districtsReducer
