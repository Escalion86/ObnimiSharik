import React from 'react'
import { ProductCirculationCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const ProductCirculationsContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Товарооборота нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, productCirculation) => (
        <ProductCirculationCard
          key={productCirculation._id}
          productCirculation={productCirculation}
          loggedUser={loggedUser}
          onClick={() => modals.openProductCirculationModal(productCirculation)}
          onClone={() => {
            // modals.openProductCirculationModal({
            //   ...DEFAULT_PRODUCT_CIRCULATION,
            //   productId: productCirculation.productId,
            // })
            const productCirculationClone = { ...productCirculation }
            delete productCirculationClone._id
            modals.openProductCirculationModal(productCirculationClone)
          }}
          onEdit={() =>
            modals.openProductCirculationModal(productCirculation, true)
          }
          onDelete={() =>
            modals.openDeleteProductCirculation(productCirculation)
          }
        />
      )}
    />
  )
}

export default ProductCirculationsContent
