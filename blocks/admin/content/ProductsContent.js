import React from 'react'
import ProductModal from '../modals/ProductModal'
import { fetchingProducts } from '@helpers/fetchers'
import { ProductCard } from '@admincomponents/Cards'

const ProductsContent = ({
  data,
  setModal = () => {},
  updateData = () => {},
}) => {
  const { products } = data

  return (
    <>
      {products.map((product) => {
        const types = product.typesId.map((type_id) =>
          data.productTypes.find((typeCheck) => typeCheck._id === type_id)
        )
        if (types[0] === undefined) types.length = 0
        return (
          <ProductCard
            key={product._id}
            product={{ ...product, types }}
            onClick={() =>
              setModal(() => (
                <ProductModal
                  product={product}
                  productTypes={data.productTypes}
                  onClose={() => setModal(null)}
                  afterConfirm={() => fetchingProducts(updateData)}
                />
              ))
            }
            onTypeClick={(type) => console.log(`type`, type)}
          />
        )
      })}
    </>
  )
}

export default ProductsContent
