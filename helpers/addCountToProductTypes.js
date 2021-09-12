const addCountToProductTypes = (productTypes, products) =>
  productTypes.map((productType) => {
    return {
      ...productType,
      count: products.filter((product) =>
        product.typesId.includes(productType._id)
      ).length,
    }
  })

export default addCountToProductTypes
