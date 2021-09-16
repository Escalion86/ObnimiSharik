import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'
import { DEFAULT_SET } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const SetTypesContent = ({ data, modals }) => {
  if (!(data && data.length > 0)) return <>'Типов наборов нет'</>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, setType) => (
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
      )}
    />
  )
}

export default SetTypesContent
