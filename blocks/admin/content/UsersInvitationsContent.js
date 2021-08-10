import React from 'react'
import { InvitationCard } from '@admincomponents/cards'
import InvitationModal from '@adminblocks/modals/InvitationModal'
import { fetchingUsersInvitations } from '@helpers/fetchers'

const UsersInvitationsContent = ({
  data,
  setModal = () => {},
  updateData = () => {},
}) => {
  const { usersInvitations } = data

  return (
    <div>
      {usersInvitations.map((userInvitation) => {
        // const count = sets.filter((set) =>
        //   set.typesId.includes(settype._id)
        // ).length
        return (
          <InvitationCard
            key={userInvitation._id}
            invitation={userInvitation}
            onClick={() =>
              setModal(() => (
                <InvitationModal
                  invitation={userInvitation}
                  onClose={() => setModal(null)}
                  afterConfirm={() => fetchingUsersInvitations(updateData)}
                />
              ))
            }
          />
        )
      })}
    </div>
  )
}

export default UsersInvitationsContent
