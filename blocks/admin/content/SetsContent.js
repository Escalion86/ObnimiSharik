import React from 'react'
import { SetCard } from '@admincomponents/cards'

const SetsContent = ({ data, modals }) => {
  const { sets } = data

  return (
    <>
      {sets.map((set) => {
        const types = set.typesId.map((type_id) =>
          data.setTypes.find((typeCheck) => typeCheck._id === type_id)
        )
        if (types[0] === undefined) types.length = 0
        return (
          <SetCard
            key={set._id}
            set={{ ...set, types }}
            products={data.products}
            onClick={() => modals.openSetModal(set)}
            onTypeClick={(settype) => modals.openSetTypeModal(settype)}
            onProductClick={(product) => modals.openProductModal(product)}
          />
        )
      })}
    </>
  )
}

export default SetsContent
