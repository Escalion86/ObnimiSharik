import addCountToProducts from '@helpers/addCountToProducts'
import addCountToProductTypes from '@helpers/addCountToProductTypes'
import addCountToSets from '@helpers/addCountToSets'
import addCountToSetTypes from '@helpers/addCountToSetTypes'
import formProductCountObj from '@helpers/formProductCountObj'
import { batch } from 'react-redux'
import {
  setDevToDo,
  setLoaded,
  setClients,
  setInvitations,
  setOrders,
  setPayments,
  setProductCirculations,
  setProducts,
  setProductTypes,
  setSets,
  setSetTypes,
  setUsers,
} from '.'

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
      dispatch(setDevToDo(data.devToDo))
      dispatch(setLoaded())
    })
  }
}
