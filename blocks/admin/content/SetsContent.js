import React from 'react'
import { SetCard } from '@admincomponents/cards'
// import formProductCountObj from '@helpers/formProductCountObj'
import { useSelector } from 'react-redux'

const SetsContent = ({ modals }) => {
  const { sets, setTypes } = useSelector((state) => state)

  if (!(sets && sets.length > 0)) return <>'Наборов нет'</>

  // const countProductCirculations = formProductCountObj(productCirculations)

  // const productsWithCount = products.map((product) => {
  //   return {
  //     ...product,
  //     count: countProductCirculations[product._id],
  //   }
  // })

  return (
    <>
      {sets.map((set) => {
        const types = set.typesId.map((type_id) =>
          setTypes.find((typeCheck) => typeCheck._id === type_id)
        )

        // let countSet = null
        // for (let i = 0; i < set.productsIdCount.length; i++) {
        //   const { id, count } = set.productsIdCount[i]

        //   if (count > 0) {
        //     //Если id продукта не найден, то значит его нет в движении средств, и следовательно его нет в наличии
        //     if (
        //       !(id in countProductCirculations) ||
        //       countProductCirculations[id] <= 0
        //     ) {
        //       countSet = 0
        //       break
        //     }
        //     const countSetTemp = Math.floor(
        //       countProductCirculations[id] / count
        //     )
        //     if (countSet === null || countSetTemp < countSet)
        //       countSet = countSetTemp
        //   }
        // }

        if (types[0] === undefined) types.length = 0
        return (
          <SetCard
            key={set._id}
            set={{ ...set, types }}
            // productsWithCount={productsWithCount}
            // count={countSet ? countSet : 0}
            onClick={() => modals.openSetModal(set)}
            onEdit={() => modals.openSetModal(set, true)}
            onDelete={() => modals.openDeleteSet(set)}
            onTypeClick={(settype) => modals.openSetTypeModal(settype)}
            onProductClick={(product) => modals.openProductModal(product)}
          />
        )
      })}
    </>
  )
}

export default SetsContent
