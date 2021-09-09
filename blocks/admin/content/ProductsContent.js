import React from 'react'
import { ProductCard } from '@admincomponents/cards'
import formProductCountObj from '@helpers/formProductCountObj'
import { useSelector } from 'react-redux'
import { deleteData } from '@helpers/CRUD'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'

const ProductsContent = ({ data, modals }) => {
  const { productTypes } = useSelector((state) => state)

  // const filteredProducts = filter.products
  //   ? products.filter((product) => {
  //       return (
  //         (filter.products.price[0] === null ||
  //           product.price >= filter.products.price[0] * 100) &&
  //         (filter.products.price[1] === null ||
  //           product.price <= filter.products.price[1] * 100) &&
  //         (filter.products.types === null ||
  //           product.typesId.some((type) =>
  //             filter.products.types.includes(type)
  //           ))
  //       )
  //     })
  //   : products

  if (!(data && data.length > 0)) return <>'Товаров нет'</>

  // const countProductCirculations = formProductCountObj(productCirculations)

  return (
    <>
      {data.map((product) => {
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
