import React from 'react'
import { ProductCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const ProductsContent = ({ data, modals }) => {
  if (!(data && data.length > 0)) return <>'Товаров нет'</>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, product) => (
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
      )}
    />
    // <ViewportList viewportRef={ref} items={data} itemMinSize={42} margin={8}>

    //   {(product) => (
    //     <ProductCard
    //       key={product._id}
    //       product={product}
    //       // count={countProductCirculations[product._id]}
    //       onClick={() => modals.openProductModal(product)}
    //       onEdit={() => modals.openProductModal(product, true)}
    //       onBuying={() =>
    //         modals.openProductCirculationModal({
    //           ...DEFAULT_PRODUCT_CIRCULATION,
    //           productId: product._id,
    //         })
    //       }
    //       onDelete={() => modals.openDeleteProduct(product)}
    //       onTypeClick={(producttype) =>
    //         modals.openProductTypeModal(producttype)
    //       }
    //     />
    //   )}
    // </ViewportList>
  )
}

export default ProductsContent
