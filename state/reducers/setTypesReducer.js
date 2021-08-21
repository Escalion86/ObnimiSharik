import { SET_SET_TYPES } from 'state/constants'

const setTypesReducer = (state = [], action) => {
  switch (action.type) {
    // case ADD_PRODUCT:
    //   return (state = { ...state, logged_in: true })
    // case 'EDIT_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    // case 'DELETE_PRODUCT':
    //   return (state = { ...state, logged_in: false })
    case SET_SET_TYPES:
      return action.setTypes
    default:
      return state
  }
}

export default setTypesReducer
