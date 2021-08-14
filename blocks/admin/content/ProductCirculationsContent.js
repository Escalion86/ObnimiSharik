import React from 'react'
import { ProductCirculationCard } from '@admincomponents/cards'

const ProductCirculationsContent = ({ data, modals }) => {
  const { productCirculations, products } = data

  return (
    <div>
      {productCirculations && productCirculations.length > 0
        ? productCirculations.map((productCirculation) => {
            return (
              <ProductCirculationCard
                key={productCirculation._id}
                productCirculation={productCirculation}
                products={products}
                onClick={() =>
                  modals.openProductCirculationModal(productCirculation)
                }
              />
            )
          })
        : 'Товарооборота нет'}
    </div>
  )
}

export default ProductCirculationsContent