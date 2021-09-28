import React from 'react'
import { InvitationCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const InvitationsContent = ({ data, modals, user }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Приглашений нет'</div>

  return (
    <Virtuoso
      data={data}
      itemContent={(index, invitation) => (
        <InvitationCard
          key={invitation._id}
          invitation={invitation}
          onClick={() => modals.openInvitationModal(invitation)}
          onEdit={() => modals.openInvitationModal(invitation, true)}
          onDelete={() => modals.openDeleteInvitation(invitation)}
        />
      )}
    />
  )
}

export default InvitationsContent
