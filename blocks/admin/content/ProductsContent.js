import React from 'react'
import { ProductCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'
import { setFilter } from '@state/actions'
import { useDispatch, useSelector } from 'react-redux'
import toasts from '@helpers/toasts'

const ProductsContent = ({ data, modals }) => {
  const { filter } = useSelector((state) => state)

  const dispatch = useDispatch()

  if (!(data && data.length > 0))
    return <div className="px-3">'Товаров нет'</div>

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
          onClone={() => {
            const productClone = { ...product }
            delete productClone._id
            modals.openProductModal(productClone)
          }}
          onDelete={() => modals.openDeleteProduct(product)}
          onTypeClick={
            (productType) => {
              dispatch(
                setFilter({
                  products: {
                    ...filter.products,
                    productTypes: [productType._id],
                  },
                })
              )
              toasts.info(
                <div>
                  <div>Применен фильтр</div>
                  <div className="italic">"{productType.name}"</div>
                </div>
              )
            }
            // modals.openProductTypeModal(producttype)
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
