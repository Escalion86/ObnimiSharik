import React from 'react'
import { TypeCard } from '@admincomponents/cards'

const SetTypesContent = ({ data, modals }) => {
  const { setTypes, sets } = data
  return (
    <div>
      {setTypes && setTypes.length > 0
        ? setTypes.map((settype) => {
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
          })
        : 'Типов наборов нет'}
    </div>
  )
}

export default SetTypesContent
