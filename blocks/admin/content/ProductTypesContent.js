import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'

const ProductTypesContent = ({ modals }) => {
  const { productTypes, products } = useSelector((state) => state)

  if (!(productTypes && productTypes.length > 0))
    return <>'Типов продуктов нет'</>

  return (
    <div>
      {productTypes.map((productType) => {
        const count = products.filter((product) =>
          product.typesId.includes(productType._id)
        ).length
        return (
          <TypeCard
            key={productType._id}
            type={productType}
            count={count}
            onClick={() => modals.openProductTypeModal(productType)}
            onEdit={() => modals.openProductTypeModal(productType, true)}
            onDelete={() => modals.openDeleteProductType(productType)}
          />
        )
      })}
    </div>
  )
}

export default ProductTypesContent
