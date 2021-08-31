import addCountToProducts from '@helpers/addCountToProducts'
import addCountToSets from '@helpers/addCountToSets'
import formProductCountObj from '@helpers/formProductCountObj'
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
    const countProductCirculations = formProductCountObj(
      data.productCirculations
    )
    const productsWithCount = addCountToProducts(
      data.products,
      countProductCirculations,
      true
    )
    const setsWithCount = addCountToSets(
      data.sets,
      countProductCirculations,
      true
    )

    batch(() => {
      dispatch(setProducts(productsWithCount))
      dispatch(setSets(setsWithCount))
      dispatch(setProductTypes(data.productTypes))
      dispatch(setSetTypes(data.setTypes))
      dispatch(setInvitations(data.invitations))
      dispatch(setUsers(data.users))
      dispatch(setProductCirculations(data.productCirculations))
    })
  }
}
