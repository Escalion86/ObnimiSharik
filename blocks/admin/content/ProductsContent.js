import React from 'react'
import { ProductCard } from '@admincomponents/cards'

const ProductsContent = ({ data, modals }) => {
  const { products, productCirculations } = data

  return (
    <>
      {products && products.length > 0
        ? products.map((product) => {
            const types = product.typesId.map((type_id) =>
              data.productTypes.find((typeCheck) => typeCheck._id === type_id)
            )
            let count = 0
            productCirculations.forEach((productCirculation) => {
              if (productCirculation.productId === product._id)
                if (productCirculation.purchase) {
                  count -= productCirculation.count
                } else {
                  count += productCirculation.count
                }
            })

            if (types[0] === undefined) types.length = 0
            return (
              <ProductCard
                key={product._id}
                product={{ ...product, types }}
                count={count}
                onClick={() => modals.openProductModal(product)}
                onTypeClick={(producttype) =>
                  modals.openProductTypeModal(producttype)
                }
              />
            )
          })
        : 'Товаров нет'}
    </>
  )
}

export default ProductsContent
