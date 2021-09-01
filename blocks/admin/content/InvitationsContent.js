import React from 'react'
import { InvitationCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'

const InvitationsContent = ({ modals }) => {
  const { invitations } = useSelector((state) => state)

  return (
    <div>
      {invitations && invitations.length > 0
        ? invitations.map((invitation) => {
            // const count = sets.filter((set) =>
            //   set.typesId.includes(settype._id)
            // ).length
            return (
              <InvitationCard
                key={invitation._id}
                invitation={invitation}
                onClick={() => modals.openInvitationModal(invitation)}
                onEdit={() => modals.openInvitationModal(invitation, true)}
                onDelete={() => modals.openDeleteInvitation(invitation)}
              />
            )
          })
        : 'Приглашений нет'}
    </div>
  )
}

export default InvitationsContent
