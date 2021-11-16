import React from 'react'
import { TypeCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'
import { DEFAULT_SET } from '@helpers/constants'
import { Virtuoso } from 'react-virtuoso'

const SetTypesContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Типов наборов нет'</div>

  const accessToContent = loggedUser.access.setTypes

  return (
    <Virtuoso
      data={data}
      itemContent={(index, setType) => (
        <TypeCard
          key={setType._id}
          type={setType}
          loggedUser={loggedUser}
          onClick={() => modals.openSetTypeModal(setType)}
          onAdd={
            loggedUser.access.sets.add
              ? () =>
                  modals.openSetModal({
                    ...DEFAULT_SET,
                    typesId: [setType._id],
                  })
              : null
          }
          onEdit={
            accessToContent.edit(setType)
              ? () => modals.openSetTypeModal(setType, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(setType)
              ? () => modals.openDeleteSetType(setType)
              : null
          }
        />
      )}
    />
  )
}

export default SetTypesContent
