import { ClientCard } from '@admincomponents/cards'
import Content from './Content'

const ClientsContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const accessToContent = loggedUser.access.clients

  return (
    <Content
      data={data}
      itemContent={(index, client) => {
        const checked = selectedItems.find((item) => item._id === client._id)
        return (
          <ClientCard
            key={client._id}
            client={client}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter(
                            (item) => item._id !== client._id
                          )
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== client._id
                            ),
                            client,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.clients.open(client)}
            onEdit={
              accessToContent.edit(client)
                ? () => modals.clients.open(client, null, null, true)
                : null
            }
            onDelete={
              accessToContent.delete(client)
                ? () => modals.clients.delete(client)
                : null
            }
          />
        )
      }}
      onFabClick={accessToContent.add ? () => modals.clients.open() : null}
      messageIfNoData="Клиентов нет"
    />
  )
}

export default ClientsContent
