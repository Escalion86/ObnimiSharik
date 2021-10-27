import React from 'react'
import { SetCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@state/actions'
import toasts from '@helpers/toasts'
import { DEFAULT_PRODUCT_CIRCULATION } from '@helpers/constants'

const SetsContent = ({ data, modals, loggedUser }) => {
  const { filter } = useSelector((state) => state)

  const dispatch = useDispatch()

  if (!(data && data.length > 0))
    return <div className="px-3">'Наборов нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, set) => (
        <SetCard
          key={set._id}
          set={set}
          loggedUser={loggedUser}
          onClick={() => modals.openSetModal(set)}
          onEdit={() => modals.openSetModal(set, null, null, true)}
          onClone={() => {
            const setClone = { ...set }
            delete setClone._id
            modals.openSetModal(setClone)
          }}
          onDelete={() => modals.openDeleteSet(set)}
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
            modals.openProductModal(product, null, null, true)
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
          onProductBuyClick={(product) =>
            modals.openProductCirculationModal({
              ...DEFAULT_PRODUCT_CIRCULATION,
              productId: product._id,
            })
          }
        />
      )}
    />
  )
}

export default SetsContent
