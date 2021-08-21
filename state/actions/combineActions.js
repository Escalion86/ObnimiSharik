import { batch } from 'react-redux'
import { setInvitations } from './invitationsActions'
import { setProductCirculations } from './productCirculationsActions'
import { setProducts } from './productsActions'
import { setProductTypes } from './productTypesActions'
import { setSets } from './setsActions'
import { setSetTypes } from './setTypesActions'
import { setUsers } from './usersActions'

export const setAllData = (data) => {
  return (dispatch) => {
    batch(() => {
      dispatch(setProducts(data.products))
      dispatch(setSets(data.sets))
      dispatch(setProductTypes(data.productTypes))
      dispatch(setSetTypes(data.setTypes))
      dispatch(setInvitations(data.invitations))
      dispatch(setUsers(data.users))
      dispatch(setProductCirculations(data.productCirculations))
    })
  }
}
