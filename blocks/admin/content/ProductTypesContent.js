import React from 'react'
import { TypeCard } from '@admincomponents/cards'

const ProductTypesContent = ({ data, modals }) => {
  const { productTypes, products } = data

  if (!(productTypes && productTypes.length > 0))
    return <>'Типов продуктов нет'</>

  return (
    <div>
      {productTypes.map((producttype) => {
        const count = products.filter((product) =>
          product.typesId.includes(producttype._id)
        ).length
        return (
          <TypeCard
            key={producttype._id}
            type={producttype}
            count={count}
            onClick={() => modals.openProductTypeModal(producttype)}
          />
        )
      })}
    </div>
  )
}

export default ProductTypesContent
