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
})

export default allReducers
