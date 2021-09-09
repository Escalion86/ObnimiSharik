import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'
import { DEFAULT_PRODUCT } from '@helpers/constants'

const ProductTypesContent = ({ data, modals }) => {
  const { products } = useSelector((state) => state)

  if (!(data && data.length > 0)) return <>'Типов продуктов нет'</>

  return (
    <>
      {data.map((productType) => {
        const count = products.filter((product) =>
          product.typesId.includes(productType._id)
        ).length
        return (
          <TypeCard
            key={productType._id}
            type={productType}
            count={count}
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
        )
      })}
    </>
  )
}

export default ProductTypesContent
