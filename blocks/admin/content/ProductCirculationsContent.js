import React from 'react'
import { ProductCirculationCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const ProductCirculationsContent = ({ data, modals }) => {
  if (!(data && data.length > 0)) return <>'Товарооборота нет'</>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, productCirculation) => (
        <ProductCirculationCard
          key={productCirculation._id}
          productCirculation={productCirculation}
          onClick={() => modals.openProductCirculationModal(productCirculation)}
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
      )}
    />
  )
}

export default ProductCirculationsContent
