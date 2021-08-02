import React from 'react'
import { TypeCard } from '@admincomponents/Cards'
import ProductTypeModal from '@adminblocks/modals/ProductTypeModal'
import { fetchingProductTypes } from '@helpers/fetchers'

const ProductTypesContent = ({
  data,
  setModal = () => {},
  updateData = () => {},
}) => {
  const { productTypes, products } = data

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
            onClick={() =>
              setModal(() => (
                <ProductTypeModal
                  producttype={producttype}
                  onClose={() => setModal(null)}
                  afterConfirm={() => fetchingProductTypes(updateData)}
                />
              ))
            }
          />
        )
      })}
    </div>
  )
}

export default ProductTypesContent
