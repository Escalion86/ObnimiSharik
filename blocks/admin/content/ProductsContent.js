import { ProductCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'
import { setFilter } from '@state/actions'
import { useDispatch, useSelector } from 'react-redux'
import toasts from '@helpers/toasts'
import Content from './Content'

const ProductsContent = ({ data, modals, loggedUser }) => {
  const { filter } = useSelector((state) => state)

  const dispatch = useDispatch()

  const accessToContent = loggedUser.access.products

  return (
    <Content
      data={data}
      itemContent={(index, product) => (
        <ProductCard
          key={product._id}
          product={product}
          loggedUser={loggedUser}
          onClick={() => modals.openProductModal(product)}
          onEdit={
            accessToContent.edit(product)
              ? () => modals.openProductModal(product, null, null, true)
              : null
          }
          onBuying={
            loggedUser.access.productCirculations.add
              ? () =>
                  modals.openProductCirculationModal({
                    ...DEFAULT_PRODUCT_CIRCULATION,
                    productId: product._id,
                    purchase: true,
                  })
              : null
          }
          onClone={
            accessToContent.add
              ? () => {
                  const productClone = { ...product }
                  delete productClone._id
                  modals.openProductModal(productClone)
                }
              : null
          }
          onDelete={
            accessToContent.delete(product)
              ? () => modals.openDeleteProduct(product)
              : null
          }
          onTypeClick={(productType) => {
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
          }}
        />
      )}
      onFabClick={accessToContent.add ? () => modals.openProductModal() : null}
      messageIfNoData="Товаров нет"
    />
  )
}

export default ProductsContent
