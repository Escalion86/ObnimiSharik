import React from 'react'
import { ProductCirculationCard } from '@admincomponents/cards'

const ProductCirculationsContent = ({ data, modals }) => {
  const { productCirculations, products } = data

  if (!(productCirculations && productCirculations.length > 0))
    return <>'Товарооборота нет'</>

  return (
    <div>
      {productCirculations.map((productCirculation) => {
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
      })}
    </div>
  )
}

export default ProductCirculationsContent
