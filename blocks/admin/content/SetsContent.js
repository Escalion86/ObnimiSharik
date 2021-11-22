import { SetCard } from '@admincomponents/cards'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@state/actions'
import toasts from '@helpers/toasts'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'
import Content from './Content'

const SetsContent = ({ data, modals, loggedUser }) => {
  const { filter } = useSelector((state) => state)

  const dispatch = useDispatch()

  const accessToContent = loggedUser.access.sets

  return (
    <Content
      data={data}
      itemContent={(index, set) => (
        <SetCard
          key={set._id}
          set={set}
          loggedUser={loggedUser}
          onClick={() => modals.openSetModal(set)}
          onEdit={
            accessToContent.edit(set)
              ? () => modals.openSetModal(set, null, null, true)
              : null
          }
          onClone={
            accessToContent.add
              ? () => {
                  const setClone = { ...set }
                  delete setClone._id
                  modals.openSetModal(setClone)
                }
              : null
          }
          onDelete={
            accessToContent.delete(set) ? () => modals.openDeleteSet(set) : null
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
            // (settype) => modals.openSetTypeModal(settype)
          }
          // onProductClick={(product) => modals.openProductModal(product)}
          onProductEditClick={(product) =>
            loggedUser.access.products.edit(product)
              ? () => modals.openProductModal(product, null, null, true)
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
                  modals.openProductCirculationModal({
                    ...DEFAULT_PRODUCT_CIRCULATION,
                    productId: product._id,
                  })
              : null
          }
        />
      )}
      onFabClick={accessToContent.add ? () => modals.openSetModal() : null}
      messageIfNoData="Наборов нет"
    />
  )
}

export default SetsContent
