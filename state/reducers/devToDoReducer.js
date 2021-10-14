import { SET_DEVTODO } from 'state/constants'

const devToDoReducer = (state = [], action) => {
  switch (action.type) {
    case SET_DEVTODO:
      return action.devToDo ?? state
    default:
      return state
  }
}

export default devToDoReducer
