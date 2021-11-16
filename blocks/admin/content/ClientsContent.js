import React from 'react'
import { ClientCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const ClientsContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Клиентов нет'</div>

  const accessToContent = loggedUser.access.clients

  return (
    <Virtuoso
      data={data}
      itemContent={(index, client) => (
        <ClientCard
          key={client._id}
          client={client}
          loggedUser={loggedUser}
          onClick={() => modals.openClientModal(client)}
          onEdit={
            accessToContent.edit(client)
              ? () => modals.openClientModal(client, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(client)
              ? () => modals.openDeleteClient(client)
              : null
          }
        />
      )}
    />
  )
}

export default ClientsContent
