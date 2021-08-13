import React from 'react'
import { InvitationCard } from '@admincomponents/cards'

const InvitationsContent = ({ data, modals }) => {
  const { invitations } = data

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
              />
            )
          })
        : 'Приглашений нет'}
    </div>
  )
}

export default InvitationsContent
