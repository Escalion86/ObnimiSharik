import formProductCountObj from './formProductCountObj'

const addCountToProducts = (
  products,
  productCirculations,
  formated = false
) => {
  const countProductCirculations = formated
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
