import { TypeCard } from '@admincomponents/cards'
import { DEFAULT_PRODUCT } from '@helpers/constants'
import Content from './Content'

const ProductTypesContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const accessToContent = loggedUser.access.productTypes

  return (
    <Content
      data={data}
      itemContent={(index, productType) => {
        const checked = selectedItems.find(
          (item) => item._id === productType._id
        )
        return (
          <TypeCard
            key={productType._id}
            type={productType}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter(
                            (item) => item._id !== productType._id
                          )
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== productType._id
                            ),
                            productType,
                          ]
                    )
                : null
            }
            logged
            loggedUser={loggedUser}
            onClick={() => modals.productTypes.open(productType)}
            onAdd={
              loggedUser.access.products.add
                ? () =>
                    modals.products.open({
                      ...DEFAULT_PRODUCT,
                      typesId: [productType._id],
                    })
                : null
            }
            onEdit={
              accessToContent.edit(productType)
                ? () => modals.productTypes.open(productType, null, null, true)
                : null
            }
            onDelete={
              accessToContent.delete(productType)
                ? () => modals.productTypes.delete(productType)
                : null
            }
          />
        )
      }}
      onFabClick={accessToContent.add ? () => modals.productTypes.open() : null}
      messageIfNoData="Типов продуктов нет"
    />
  )
}

export default ProductTypesContent
