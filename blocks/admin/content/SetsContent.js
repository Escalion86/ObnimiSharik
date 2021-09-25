import React from 'react'
import { SetCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@state/actions'
import toasts from '@helpers/toasts'

const SetsContent = ({ data, modals }) => {
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
          // productsWithCount={productsWithCount}
          // count={countSet ? countSet : 0}
          onClick={() => modals.openSetModal(set)}
          onEdit={() => modals.openSetModal(set, true)}
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
                  <div>Применен фильтр</div>
                  <div className="italic">"{productType.name}"</div>
                </div>
              )
            }
            // (settype) => modals.openSetTypeModal(settype)
          }
          onProductClick={(product) => modals.openProductModal(product)}
        />
      )}
    />
  )
}

export default SetsContent
