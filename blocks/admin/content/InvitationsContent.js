import { InvitationCard } from '@admincomponents/cards'
import Content from './Content'

const InvitationsContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.invitations

  return (
    <Content
      data={data}
      itemContent={(index, invitation) => (
        <InvitationCard
          key={invitation._id}
          invitation={invitation}
          loggedUser={loggedUser}
          onClick={() => modals.openInvitationModal(invitation)}
          onEdit={
            accessToContent.edit(invitation)
              ? () => modals.openInvitationModal(invitation, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(invitation)
              ? () => modals.openDeleteInvitation(invitation)
              : null
          }
        />
      )}
      onFabClick={
        accessToContent.add ? () => modals.openInvitationModal() : null
      }
      messageIfNoData="Приглашений нет"
    />
  )
}

export default InvitationsContent
