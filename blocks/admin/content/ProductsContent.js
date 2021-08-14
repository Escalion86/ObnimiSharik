import React from 'react'
import { ProductCard } from '@admincomponents/cards'

const ProductsContent = ({ data, modals }) => {
  const { products, productCirculations } = data

  if (!(products && products.length > 0)) return <>'Товаров нет'</>

  const countProductCirculations = {}
  if (productCirculations && productCirculations.length > 0)
    productCirculations.forEach((productCirculation) => {
      if (productCirculation.productId in countProductCirculations)
        if (productCirculation.purchase) {
          countProductCirculations[productCirculation.productId] -=
            productCirculation.count
        } else {
          countProductCirculations[productCirculation.productId] +=
            productCirculation.count
        }
      else if (productCirculation.purchase) {
        countProductCirculations[productCirculation.productId] =
          -productCirculation.count
      } else {
        countProductCirculations[productCirculation.productId] =
          productCirculation.count
      }
    })

  return (
    <>
      {products.map((product) => {
        const types = product.typesId.map((type_id) =>
          data.productTypes.find((typeCheck) => typeCheck._id === type_id)
        )

        if (types[0] === undefined) types.length = 0
        return (
          <ProductCard
            key={product._id}
            product={{ ...product, types }}
            count={countProductCirculations[product._id]}
            onClick={() => modals.openProductModal(product)}
            onTypeClick={(producttype) =>
              modals.openProductTypeModal(producttype)
            }
          />
        )
      })}
    </>
  )
}

export default ProductsContent
