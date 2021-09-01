import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'

const SetTypesContent = ({ modals }) => {
  const { setTypes, sets } = useSelector((state) => state)

  if (!(setTypes && setTypes.length > 0)) return <>'Типов наборов нет'</>

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
            onEdit={() => modals.openSetTypeModal(settype, true)}
            onDelete={() => modals.openDeleteSetType(settype)}
          />
        )
      })}
    </div>
  )
}

export default SetTypesContent
