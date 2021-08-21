import productsReducer from './productsReducer'
import usersReducer from './usersReducer'
import { combineReducers } from 'redux'
import setsReducer from './setsReducer'
import productTypesReducer from './productTypesReducer'
import setTypesReducer from './setTypesReducer'
import invitationsReducer from './invitationsReducer'
import productCirculationsReducer from './productCirculationsReducer'

const allReducers = combineReducers({
  products: productsReducer,
  sets: setsReducer,
  productTypes: productTypesReducer,
  setTypes: setTypesReducer,
  invitaions: invitationsReducer,
  users: usersReducer,
  productCirculations: productCirculationsReducer,
})

export default allReducers
