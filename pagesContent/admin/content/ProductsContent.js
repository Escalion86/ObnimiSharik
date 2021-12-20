import { ProductCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'
import { setFilter } from '@state/actions'
import { useDispatch, useSelector } from 'react-redux'
import toasts from '@helpers/toasts'
import Content from './Content'

const ProductsContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const { filter } = useSelector((state) => state)

  const dispatch = useDispatch()

  const accessToContent = loggedUser.access.products

  return (
    <Content
      data={data}
      itemContent={(index, product) => {
        const checked = selectedItems.find((item) => item._id === product._id)
        return (
          <ProductCard
            key={product._id}
            product={product}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter(
                            (item) => item._id !== product._id
                          )
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== product._id
                            ),
                            product,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.products.open(product)}
            onEdit={
              accessToContent.edit(product)
                ? () => modals.products.open(product, null, null, true)
                : null
            }
            onBuying={
              loggedUser.access.productCirculations.add
                ? () =>
                    modals.productCirculations.open({
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
                    modals.products.open(productClone)
                  }
                : null
            }
            onDelete={
              accessToContent.delete(product)
                ? () => modals.products.delete(product)
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
        )
      }}
      onFabClick={accessToContent.add ? () => modals.products.open() : null}
      messageIfNoData="Товаров нет"
    />
  )
}

export default ProductsContent
