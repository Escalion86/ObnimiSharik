import React from 'react'
import { InvitationCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const InvitationsContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Приглашений нет'</div>

  const accessToContent = loggedUser.access.invitations

  return (
    <Virtuoso
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
    />
  )
}

export default InvitationsContent
