import { TypeCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT } from '@helpers/constants'
import Content from './Content'

const ProductTypesContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.productTypes

  return (
    <Content
      data={data}
      itemContent={(index, productType) => (
        <TypeCard
          key={productType._id}
          type={productType}
          loggedUser={loggedUser}
          onClick={() => modals.openProductTypeModal(productType)}
          onAdd={
            loggedUser.access.products.add
              ? () =>
                  modals.openProductModal({
                    ...DEFAULT_PRODUCT,
                    typesId: [productType._id],
                  })
              : null
          }
          onEdit={
            accessToContent.edit(productType)
              ? () => modals.openProductTypeModal(productType, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(productType)
              ? () => modals.openDeleteProductType(productType)
              : null
          }
        />
      )}
      onFabClick={
        accessToContent.add ? () => modals.openProductTypeModal() : null
      }
      messageIfNoData="Типов продуктов нет"
    />
  )
}

export default ProductTypesContent
