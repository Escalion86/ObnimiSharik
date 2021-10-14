import { SET_DEVTODO } from 'state/constants'

export const setDevToDo = (devToDo) => {
  return {
    type: SET_DEVTODO,
    devToDo,
  }
}
