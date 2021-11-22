import { ProductCirculationCard } from '@admincomponents/cards'
import Content from './Content'

const ProductCirculationsContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.productCirculations

  return (
    <Content
      data={data}
      itemContent={(index, productCirculation) => (
        <ProductCirculationCard
          key={productCirculation._id}
          productCirculation={productCirculation}
          loggedUser={loggedUser}
          onClick={() => modals.openProductCirculationModal(productCirculation)}
          onClone={
            accessToContent.add
              ? () => {
                  // modals.openProductCirculationModal({
                  //   ...DEFAULT_PRODUCT_CIRCULATION,
                  //   productId: productCirculation.productId,
                  // })
                  const productCirculationClone = { ...productCirculation }
                  delete productCirculationClone._id
                  modals.openProductCirculationModal(productCirculationClone)
                }
              : null
          }
          onEdit={
            accessToContent.edit(productCirculation)
              ? () =>
                  modals.openProductCirculationModal(
                    productCirculation,
                    null,
                    null,
                    true
                  )
              : null
          }
          onDelete={
            accessToContent.delete(productCirculation)
              ? () => modals.openDeleteProductCirculation(productCirculation)
              : null
          }
        />
      )}
      onFabClick={
        accessToContent.add ? () => modals.openProductCirculationModal() : null
      }
      messageIfNoData="Товарооборота нет"
    />
  )
}

export default ProductCirculationsContent
