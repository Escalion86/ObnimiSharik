import React from 'react'
import { ProductCard } from '@admincomponents/cards'
import formProductCountObj from '@helpers/formProductCountObj'
import { useSelector } from 'react-redux'
import { deleteData } from '@helpers/CRUD'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'

const ProductsContent = ({ data, modals }) => {
  if (!(data && data.length > 0)) return <>'Товаров нет'</>

  return (
    <>
      {data.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          // count={countProductCirculations[product._id]}
          onClick={() => modals.openProductModal(product)}
          onEdit={() => modals.openProductModal(product, true)}
          onBuying={() =>
            modals.openProductCirculationModal({
              ...DEFAULT_PRODUCT_CIRCULATION,
              productId: product._id,
            })
          }
          onDelete={() => modals.openDeleteProduct(product)}
          onTypeClick={(producttype) =>
            modals.openProductTypeModal(producttype)
          }
        />
      ))}
    </>
  )
}

export default ProductsContent
