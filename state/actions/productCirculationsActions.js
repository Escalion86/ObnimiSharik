import { SET_PRODUCT_CIRCULATIONS } from 'state/constants'
import { batch } from 'react-redux'
import formProductCountObj from '@helpers/formProductCountObj'
import addCountToSets from '@helpers/addCountToSets'
import addCountToProducts from '@helpers/addCountToProducts'
import { setProducts } from './productsActions'
import { setSets } from './setsActions'

export const setProductCirculations = (
  productCirculations,
  addCount = false
) => {
  if (addCount) {
    return (dispatch, getState) => {
      const countProductCirculations = formProductCountObj(productCirculations)
      const productsWithCount = addCountToProducts(
        getState().products,
        countProductCirculations,
        true
      )
      const setsWithCount = addCountToSets(
        getState().sets,
        countProductCirculations,
        true
      )

      batch(() => {
        dispatch(setProducts(productsWithCount))
        dispatch(setSets(setsWithCount))
        dispatch(setProductCirculations(productCirculations))
      })
    }
  }

  return {
    type: SET_PRODUCT_CIRCULATIONS,
    productCirculations,
  }
}
