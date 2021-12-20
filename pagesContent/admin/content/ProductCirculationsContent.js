import { ProductCirculationCard } from '@admincomponents/cards'
import Content from './Content'

const ProductCirculationsContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const accessToContent = loggedUser.access.productCirculations

  return (
    <Content
      data={data}
      itemContent={(index, productCirculation) => {
        const checked = selectedItems.find(
          (item) => item._id === productCirculation._id
        )
        return (
          <ProductCirculationCard
            key={productCirculation._id}
            productCirculation={productCirculation}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter(
                            (item) => item._id !== productCirculation._id
                          )
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== productCirculation._id
                            ),
                            productCirculation,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.productCirculations.open(productCirculation)}
            onClone={
              accessToContent.add
                ? () => {
                    // modals.productCirculations.open({
                    //   ...DEFAULT_PRODUCT_CIRCULATION,
                    //   productId: productCirculation.productId,
                    // })
                    const productCirculationClone = { ...productCirculation }
                    delete productCirculationClone._id
                    modals.productCirculations.open(productCirculationClone)
                  }
                : null
            }
            onEdit={
              accessToContent.edit(productCirculation)
                ? () =>
                    modals.productCirculations.open(
                      productCirculation,
                      null,
                      null,
                      true
                    )
                : null
            }
            onDelete={
              accessToContent.delete(productCirculation)
                ? () => modals.productCirculations.delete(productCirculation)
                : null
            }
          />
        )
      }}
      onFabClick={
        accessToContent.add ? () => modals.productCirculations.open() : null
      }
      messageIfNoData="Товарооборота нет"
    />
  )
}

export default ProductCirculationsContent
