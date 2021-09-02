import React from 'react'
import { ProductCirculationCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'

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
            onAdd={() =>
              modals.openProductCirculationModal({
                ...DEFAULT_PRODUCT_CIRCULATION,
                productId: [productCirculation.productId],
              })
            }
            onEdit={() =>
              modals.openProductCirculationModal(productCirculation, true)
            }
            onDelete={() => modals.openDeleteProductCirculation(productType)}
          />
        )
      })}
    </div>
  )
}

export default ProductCirculationsContent
