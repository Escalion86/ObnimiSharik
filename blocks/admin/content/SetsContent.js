import React from 'react'
import { SetCard } from '@admincomponents/cards'
// import formProductCountObj from '@helpers/formProductCountObj'
import { useSelector } from 'react-redux'

const SetsContent = ({ data, modals }) => {
  if (!(data && data.length > 0)) return <>'Наборов нет'</>

  // const countProductCirculations = formProductCountObj(productCirculations)

  // const productsWithCount = products.map((product) => {
  //   return {
  //     ...product,
  //     count: countProductCirculations[product._id],
  //   }
  // })

  return (
    <>
      {data.map((set) => (
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
      ))}
    </>
  )
}

export default SetsContent
