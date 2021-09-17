import React from 'react'
import { ClientCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const ClientsContent = ({ data, modals }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Клиентов нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, client) => (
        <ClientCard
          key={client._id}
          client={client}
          onClick={() => modals.openClientModal(client)}
          onEdit={() => modals.openClientModal(client, true)}
          onDelete={() => modals.openDeleteClient(client)}
        />
      )}
    />
  )
}

export default ClientsContent
