import productsReducer from './productsReducer'
import usersReducer from './usersReducer'
import { combineReducers } from 'redux'
import setsReducer from './setsReducer'
import productTypesReducer from './productTypesReducer'
import setTypesReducer from './setTypesReducer'
import invitationsReducer from './invitationsReducer'
import productCirculationsReducer from './productCirculationsReducer'
import modalsReducer from './modalsReducer'
import filterReducer from './filterReducer'
import sortingReducer from './sortingReducer'
import pageReducer from './pageReducer'
import clientsReducer from './clientsReducer'
import ordersReducer from './ordersReducer'
import paymentsReducer from './paymentsReducer'
import appReducer from './appReducer '

const allReducers = combineReducers({
  products: productsReducer,
  sets: setsReducer,
  productTypes: productTypesReducer,
  setTypes: setTypesReducer,
  invitations: invitationsReducer,
  users: usersReducer,
  productCirculations: productCirculationsReducer,
  modals: modalsReducer,
  filter: filterReducer,
  sorting: sortingReducer,
  page: pageReducer,
  clients: clientsReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  loaded: appReducer,
})

export default allReducers
