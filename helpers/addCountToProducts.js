import formProductCountObj from './formProductCountObj'

const addCountToProducts = (products, productCirculations) => {
  const countProductCirculations = formProductCountObj(productCirculations)

  return products.map((product) => {
    return {
      ...product,
      count: countProductCirculations[product._id],
    }
  })
}

export default addCountToProducts
