import { SetCard } from '@admincomponents/cards'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@state/actions'
import toasts from '@helpers/toasts'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'
import Content from './Content'

const SetsContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const { filter } = useSelector((state) => state)

  const dispatch = useDispatch()

  const accessToContent = loggedUser.access.sets

  return (
    <Content
      data={data}
      itemContent={(index, set) => {
        const checked = selectedItems.find((item) => item._id === set._id)
        return (
          <SetCard
            key={set._id}
            set={set}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter((item) => item._id !== set._id)
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== set._id
                            ),
                            set,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.sets.open(set)}
            onEdit={
              accessToContent.edit(set)
                ? () => modals.sets.open(set, null, null, true)
                : null
            }
            onClone={
              accessToContent.add
                ? () => {
                    const setClone = { ...set }
                    delete setClone._id
                    modals.sets.open(setClone)
                  }
                : null
            }
            onDelete={
              accessToContent.delete(set) ? () => modals.sets.delete(set) : null
            }
            onTypeClick={
              (setType) => {
                dispatch(
                  setFilter({
                    sets: {
                      ...filter.sets,
                      setTypes: [setType._id],
                    },
                  })
                )
                toasts.info(
                  <div>
                    <div>Применен фильтр по типу набора</div>
                    <div className="italic">"{setType.name}"</div>
                  </div>
                )
              }
              // (settype) => modals.setTypes.open(settype)
            }
            // onProductClick={(product) => modals.products.open(product)}
            onProductEditClick={(product) =>
              loggedUser.access.products.edit(product)
                ? () => modals.products.open(product, null, null, true)
                : null
            }
            onProductFilterClick={(product) => {
              dispatch(
                setFilter({
                  sets: {
                    ...filter.sets,
                    products: [product._id],
                  },
                })
              )
              toasts.info(
                <div>
                  <div>Применен фильтр по товару в наборе</div>
                  <div className="italic">"{product.name}"</div>
                </div>
              )
            }}
            onProductBuyClick={
              loggedUser.access.productCirculations.add
                ? (product) =>
                    modals.productCirculations.open({
                      ...DEFAULT_PRODUCT_CIRCULATION,
                      productId: product._id,
                    })
                : null
            }
          />
        )
      }}
      onFabClick={accessToContent.add ? () => modals.sets.open() : null}
      messageIfNoData="Наборов нет"
    />
  )
}

export default SetsContent
