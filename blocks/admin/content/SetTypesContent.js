import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'
import { DEFAULT_SET } from '@helpers/constants'

const SetTypesContent = ({ data, modals }) => {
  const { setTypes, sets } = useSelector((state) => state)

  if (!(data && data.length > 0)) return <>'Типов наборов нет'</>

  return (
    <>
      {data.map((setType) => (
        <TypeCard
          key={setType._id}
          type={setType}
          onClick={() => modals.openSetTypeModal(setType)}
          onAdd={() =>
            modals.openSetModal({
              ...DEFAULT_SET,
              typesId: [setType._id],
            })
          }
          onEdit={() => modals.openSetTypeModal(setType, true)}
          onDelete={() => modals.openDeleteSetType(setType)}
        />
      ))}
    </>
  )
}

export default SetTypesContent
