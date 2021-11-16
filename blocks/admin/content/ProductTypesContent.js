import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const ProductTypesContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Типов продуктов нет'</div>

  const accessToContent = loggedUser.access.productTypes

  return (
    <Virtuoso
      data={data}
      itemContent={(index, productType) => (
        <TypeCard
          key={productType._id}
          type={productType}
          loggedUser={loggedUser}
          onClick={() => modals.openProductTypeModal(productType)}
          onAdd={
            loggedUser.access.products.add
              ? () =>
                  modals.openProductModal({
                    ...DEFAULT_PRODUCT,
                    typesId: [productType._id],
                  })
              : null
          }
          onEdit={
            accessToContent.edit(productType)
              ? () => modals.openProductTypeModal(productType, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(productType)
              ? () => modals.openDeleteProductType(productType)
              : null
          }
        />
      )}
    />
  )
}

export default ProductTypesContent
