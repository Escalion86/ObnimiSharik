import React from 'react'
import { ProductCard } from '@admincomponents/cards'
import formProductCountObj from '@helpers/formProductCountObj'
import { useSelector } from 'react-redux'
import { deleteData } from '@helpers/CRUD'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'

const ProductsContent = ({ modals }) => {
  const { products, productTypes } = useSelector((state) => state)

  if (!(products && products.length > 0)) return <>'Товаров нет'</>

  // const countProductCirculations = formProductCountObj(productCirculations)

  return (
    <>
      {products.map((product) => {
        const types = product.typesId.map((type_id) =>
          productTypes.find((typeCheck) => typeCheck._id === type_id)
        )

        if (types[0] === undefined) types.length = 0
        return (
          <ProductCard
            key={product._id}
            product={{ ...product, types }}
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
        )
      })}
    </>
  )
}

export default ProductsContent
