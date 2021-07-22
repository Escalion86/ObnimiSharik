import React from 'react'
import { TypeCard } from '@admincomponents/Cards'

const ProductTypesContent = ({ data }) => {
  const { productTypes } = data

  return (
    <div>
      {productTypes.map((producttype) => (
        <TypeCard key={producttype._id} type={producttype} />
      ))}
    </div>
  )
}

export default ProductTypesContent
