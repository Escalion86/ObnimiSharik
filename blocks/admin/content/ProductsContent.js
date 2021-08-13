import React from 'react'
import { ProductCard } from '@admincomponents/cards'

const ProductsContent = ({ data, modals }) => {
  const { products } = data

  return (
    <>
      {products && products.length > 0
        ? products.map((product) => {
            const types = product.typesId.map((type_id) =>
              data.productTypes.find((typeCheck) => typeCheck._id === type_id)
            )
            if (types[0] === undefined) types.length = 0
            return (
              <ProductCard
                key={product._id}
                product={{ ...product, types }}
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
