import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'
import { DEFAULT_PRODUCT } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const ProductTypesContent = ({ data, modals, user }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Типов продуктов нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, productType) => (
        <TypeCard
          key={productType._id}
          type={productType}
          role={user.role}
          onClick={() => modals.openProductTypeModal(productType)}
          onAdd={() =>
            modals.openProductModal({
              ...DEFAULT_PRODUCT,
              typesId: [productType._id],
            })
          }
          onEdit={() => modals.openProductTypeModal(productType, true)}
          onDelete={() => modals.openDeleteProductType(productType)}
        />
      )}
    />
  )
}

export default ProductTypesContent
