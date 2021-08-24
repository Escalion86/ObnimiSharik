import { ADD_MODAL, REMOVE_MODAL, SET_MODAL } from 'state/constants'

export const setModal = (modal) => {
  return {
    type: SET_MODAL,
    modal,
  }
}

// export const addModal = (modal) => {
//   return {
//     type: ADD_MODAL,
//     modal,
//   }
// }

export const removeModal = () => {
  return {
    type: REMOVE_MODAL,
  }
}

// export const removeAllModals = () => {
//   return {
//     type: REMOVE_ALL_MODALS,
//   }
// }
