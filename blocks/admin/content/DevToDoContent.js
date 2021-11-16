import React from 'react'
import { DevToDoCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const DevToDoContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Заявок разработчику нет'</div>

  const accessToContent = loggedUser.access.devToDo

  return (
    <Virtuoso
      data={data}
      itemContent={(index, devToDo) => (
        <DevToDoCard
          key={devToDo._id}
          devToDo={devToDo}
          loggedUser={loggedUser}
          onClick={() => modals.openDevToDoModal(devToDo)}
          onEdit={
            accessToContent.edit(devToDo)
              ? () => modals.openDevToDoModal(devToDo, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(devToDo)
              ? () => modals.openDeleteDevToDo(devToDo)
              : null
          }
        />
      )}
    />
  )
}

export default DevToDoContent
