import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'

const ProductTypesContent = ({ modals }) => {
  const { productTypes, products } = useSelector((state) => state)

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
