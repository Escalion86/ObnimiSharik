import addCountToProducts from '@helpers/addCountToProducts'
import addCountToProductTypes from '@helpers/addCountToProductTypes'
import addCountToSets from '@helpers/addCountToSets'
import addCountToSetTypes from '@helpers/addCountToSetTypes'
import formProductCountObj from '@helpers/formProductCountObj'
import { batch } from 'react-redux'
import { setClients } from './clientsActions'
import { setInvitations } from './invitationsActions'
import { setOrders } from './ordersActions'
import { setPayments } from './paymentsActions'
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
    const productTypesWithCount = addCountToProductTypes(
      data.productTypes,
      data.products
    )
    const setTypesWithCount = addCountToSetTypes(data.setTypes, data.sets)

    batch(() => {
      dispatch(setProducts(productsWithCount))
      dispatch(setSets(setsWithCount))
      dispatch(setProductTypes(productTypesWithCount))
      dispatch(setSetTypes(setTypesWithCount))
      dispatch(setInvitations(data.invitations))
      dispatch(setUsers(data.users))
      dispatch(setProductCirculations(data.productCirculations))
      dispatch(setClients(data.clients))
      dispatch(setOrders(data.orders))
      dispatch(setPayments(data.payments))
    })
  }
}
