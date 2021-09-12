import {
  // SET_INVITATIONS_FILTER,
  // SET_PRODUCTS_FILTER,
  // SET_PRODUCT_CIRCULSTIONS_FILTER,
  // SET_PRODUCT_TYPES_FILTER,
  // SET_SETS_FILTER,
  // SET_SET_TYPES_FILTER,
  // SET_USERS_FILTER,
  SET_FILTER,
} from 'state/constants'

export const setFilter = (data) => {
  return {
    type: SET_FILTER,
    data,
  }
}

// export const setProductsFilter = (data) => {
//   return {
//     type: SET_PRODUCTS_FILTER,
//     data,
//   }
// }

// export const setSetsFilter = (data) => {
//   return {
//     type: SET_SETS_FILTER,
//     data,
//   }
// }

// export const setProductTypesFilter = (data) => {
//   return {
//     type: SET_PRODUCT_TYPES_FILTER,
//     data,
//   }
// }

// export const setSetTypesFilter = (data) => {
//   return {
//     type: SET_SET_TYPES_FILTER,
//     data,
//   }
// }

// export const setProductCirculationsFilter = (data) => {
//   return {
//     type: SET_PRODUCT_CIRCULSTIONS_FILTER,
//     data,
//   }
// }

// export const setInvitationsFilter = (data) => {
//   return {
//     type: SET_INVITATIONS_FILTER,
//     data,
//   }
// }

// export const setUsersFilter = (data) => {
//   return {
//     type: SET_USERS_FILTER,
//     data,
//   }
// }
