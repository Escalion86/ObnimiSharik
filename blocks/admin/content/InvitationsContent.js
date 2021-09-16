import React from 'react'
import { InvitationCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const InvitationsContent = ({ data, modals }) => {
  if (!(data && data.length > 0)) return <>'Приглашений нет'</>

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
