import React from 'react'
import { SetCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const SetsContent = ({ data, modals }) => {
  if (!(data && data.length > 0)) return <>'Наборов нет'</>

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
          onDelete={() => modals.openDeleteSet(set)}
          onTypeClick={(settype) => modals.openSetTypeModal(settype)}
          onProductClick={(product) => modals.openProductModal(product)}
        />
      )}
    />
  )
}

export default SetsContent
