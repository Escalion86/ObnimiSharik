const formProductCountObj = (productCirculations) => {
  const countArray = {}

  if (productCirculations && productCirculations.length > 0)
    productCirculations.forEach((productCirculation) => {
      if (productCirculation.productId in countArray)
        if (productCirculation.purchase) {
          countArray[productCirculation.productId] -= productCirculation.count
        } else {
          countArray[productCirculation.productId] += productCirculation.count
        }
      else if (productCirculation.purchase) {
        countArray[productCirculation.productId] = -productCirculation.count
      } else {
        countArray[productCirculation.productId] = productCirculation.count
      }
    })

  return countArray
}

export default formProductCountObj
