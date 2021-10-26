import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'
import { DEFAULT_SET } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const SetTypesContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Типов наборов нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, setType) => (
        <TypeCard
          key={setType._id}
          type={setType}
          loggedUser={loggedUser}
          onClick={() => modals.openSetTypeModal(setType)}
          onAdd={() =>
            modals.openSetModal({
              ...DEFAULT_SET,
              typesId: [setType._id],
            })
          }
          onEdit={() => modals.openSetTypeModal(setType, null, null, true)}
          onDelete={() => modals.openDeleteSetType(setType)}
        />
      )}
    />
  )
}

export default SetTypesContent
