import Title from '@blocks/admin/Title'
import React, { useState } from 'react'
import ProductModal from '../modals/ProductModal'
import { fetchingProducts } from '@helpers/fetchers'

const Types = ({ types, onClick }) => (
  <div className="flex mt-1 space-x-2 text-sm">
    <div>Тип:</div>
    {types.map((type, index) => (
      <div
        key={'type' + index}
        className="cursor-pointer text-primary hover:text-toxic"
        onClick={() => onClick(type)}
      >
        {type.name}
      </div>
    ))}
  </div>
)

const ProductCard = ({
  product,
  onClick = () => {},
  onTypeClick = () => {},
}) => (
  <div className="flex items-center p-2 mx-1 my-2 bg-white shadow-md">
    <img
      className="w-12 h-12"
      src="/img/product.webp"
      alt="product"
      width={48}
      height={48}
    />
    <div className="flex-1 ml-3">
      <div className="flex justify-between space-x-2">
        <div
          className="w-3/12 font-semibold cursor-pointer text-primary hover:text-toxic"
          onClick={() => onClick(product)}
        >
          {product.name}
        </div>
        <div className="flex-1 italic">{product.description}</div>
      </div>
      <Types types={product.types} onClick={onTypeClick} />
    </div>
    <div className="w-1/12 text-right">
      <div className="font-bold">{product.price} ₽</div>
      <div className="">{product.price} ₽</div>
    </div>
  </div>
)
const ProductsContent = ({
  data,
  setModal = () => {},
  updateData = () => {},
}) => {
  console.log(`data.products`, data.products)
  const { products } = data

  return (
    <div>
      {products.map((product) => {
        const types = product.types.map((type) =>
          data.types.find((typeCheck) => typeCheck._id === type)
        )
        console.log(`types`, types)
        return (
          <ProductCard
            key={product._id}
            product={{ ...product, types }}
            onClick={() =>
              setModal(() => (
                <ProductModal
                  product={product}
                  types={data.types}
                  onClose={() => setModal(null)}
                  afterConfirm={() => fetchingProducts(updateData)}
                />
              ))
            }
          />
        )
      })}
    </div>
  )
}

export default ProductsContent
