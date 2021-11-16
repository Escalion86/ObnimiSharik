import React from 'react'
import { ProductCirculationCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const ProductCirculationsContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Товарооборота нет'</div>

  const accessToContent = loggedUser.access.productCirculations

  return (
    <Virtuoso
      data={data}
      itemContent={(index, productCirculation) => (
        <ProductCirculationCard
          key={productCirculation._id}
          productCirculation={productCirculation}
          loggedUser={loggedUser}
          onClick={() => modals.openProductCirculationModal(productCirculation)}
          onClone={
            accessToContent.add
              ? () => {
                  // modals.openProductCirculationModal({
                  //   ...DEFAULT_PRODUCT_CIRCULATION,
                  //   productId: productCirculation.productId,
                  // })
                  const productCirculationClone = { ...productCirculation }
                  delete productCirculationClone._id
                  modals.openProductCirculationModal(productCirculationClone)
                }
              : null
          }
          onEdit={
            accessToContent.edit(productCirculation)
              ? () =>
                  modals.openProductCirculationModal(
                    productCirculation,
                    null,
                    null,
                    true
                  )
              : null
          }
          onDelete={
            accessToContent.delete(productCirculation)
              ? () => modals.openDeleteProductCirculation(productCirculation)
              : null
          }
        />
      )}
    />
  )
}

export default ProductCirculationsContent
