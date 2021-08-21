import { setProducts } from './productsActions'
import { setSets } from './setsActions'
import { setProductTypes } from './productTypesActions'
import { setSetTypes } from './setTypesActions'
import { setInvitations } from './invitationsActions'
import { setUsers } from './usersActions'
import { setProductCirculations } from './productCirculationsActions'
import { batch } from 'react-redux'

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
