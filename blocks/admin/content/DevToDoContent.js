import React from 'react'
import { DevToDoCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const DevToDoContent = ({ data, modals, user }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Заявок разработчику нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, devToDo) => (
        <DevToDoCard
          key={devToDo._id}
          devToDo={devToDo}
          role={user.role}
          onClick={() => modals.openDevToDoModal(devToDo)}
          onEdit={() => modals.openDevToDoModal(devToDo, true)}
          onDelete={() => modals.openDeleteDevToDo(devToDo)}
        />
      )}
    />
  )
}

export default DevToDoContent
