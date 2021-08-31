import React from 'react'
import { ProductCirculationCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'

const ProductCirculationsContent = ({ modals }) => {
  const { productCirculations } = useSelector((state) => state)

  if (!(productCirculations && productCirculations.length > 0))
    return <>'Товарооборота нет'</>

  return (
    <div>
      {productCirculations.map((productCirculation) => {
        return (
          <ProductCirculationCard
            key={productCirculation._id}
            productCirculation={productCirculation}
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
