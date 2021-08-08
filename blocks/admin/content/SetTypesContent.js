import React from 'react'
import { TypeCard } from '@admincomponents/Cards'

const SetTypesContent = ({ data, modals }) => {
  const { setTypes, sets } = data
  return (
    <div>
      {setTypes.map((settype) => {
        const count = sets.filter((set) =>
          set.typesId.includes(settype._id)
        ).length
        return (
          <TypeCard
            key={settype._id}
            type={settype}
            count={count}
            onClick={() => modals.openSetTypeModal(settype)}
          />
        )
      })}
    </div>
  )
}

export default SetTypesContent
