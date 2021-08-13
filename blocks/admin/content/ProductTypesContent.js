import React from 'react'
import { TypeCard } from '@admincomponents/cards'

const ProductTypesContent = ({ data, modals }) => {
  const { productTypes, products } = data

  return (
    <div>
      {productTypes && productTypes.length > 0
        ? productTypes.map((producttype) => {
            const count = products.filter((product) =>
              product.typesId.includes(producttype._id)
            ).length
            return (
              <TypeCard
                key={producttype._id}
                type={producttype}
                count={count}
                onClick={() => modals.openProductTypeModal(producttype)}
              />
            )
          })
        : 'Типов продуктов нет'}
    </div>
  )
}

export default ProductTypesContent
