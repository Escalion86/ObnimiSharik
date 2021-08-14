import React from 'react'
import { ProductCard } from '@admincomponents/cards'
import formProductCountObj from '@helpers/formProductCountObj'

const ProductsContent = ({ data, modals }) => {
  const { products, productCirculations } = data

  if (!(products && products.length > 0)) return <>'Товаров нет'</>

  const countProductCirculations = formProductCountObj(productCirculations)

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
