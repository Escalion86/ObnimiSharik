import { ClientCard } from '@admincomponents/cards'
import Content from './Content'

const ClientsContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.clients

  return (
    <Content
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
      onFabClick={accessToContent.add ? () => modals.openClientModal() : null}
      messageIfNoData="Клиентов нет"
    />
  )
}

export default ClientsContent
