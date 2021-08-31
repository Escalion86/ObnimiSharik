// import { useSelector } from 'react-redux'
import formProductCountObj from './formProductCountObj'

const addCountToProducts = (
  products,
  productCirculations = null,
  formated = false
) => {
  // const state = useSelector((state) => state)
  if (!products) return
  // products = useSelector((state) => state.products)

  let countProductCirculations
  if (!productCirculations)
    // countProductCirculations = formProductCountObjuseSelector(
    //   (state) => state.productCirculations
    // )
    return products
  else
    countProductCirculations = formated
      ? productCirculations
      : formProductCountObj(productCirculations)

  return products.map((product) => {
    return {
      ...product,
      count: countProductCirculations[product._id]
        ? countProductCirculations[product._id]
        : 0,
    }
  })
}

export default addCountToProducts
