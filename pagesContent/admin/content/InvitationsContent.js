import { InvitationCard } from '@admincomponents/cards'
import Content from './Content'

const InvitationsContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const accessToContent = loggedUser.access.invitations

  return (
    <Content
      data={data}
      itemContent={(index, invitation) => {
        const checked = selectedItems.find(
          (item) => item._id === invitation._id
        )
        return (
          <InvitationCard
            key={invitation._id}
            invitation={invitation}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter(
                            (item) => item._id !== invitation._id
                          )
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== invitation._id
                            ),
                            invitation,
                          ]
                    )
                : null
            }
            loggedUser={loggedUser}
            onClick={() => modals.invitations.open(invitation)}
            onEdit={
              accessToContent.edit(invitation)
                ? () => modals.invitations.open(invitation, null, null, true)
                : null
            }
            onDelete={
              accessToContent.delete(invitation)
                ? () => modals.invitations.delete(invitation)
                : null
            }
          />
        )
      }}
      onFabClick={accessToContent.add ? () => modals.invitations.open() : null}
      messageIfNoData="Приглашений нет"
    />
  )
}

export default InvitationsContent
