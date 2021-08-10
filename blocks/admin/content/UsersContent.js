import React from 'react'
import { UserCard } from '@admincomponents/cards'
import { fetchingUsers } from '@helpers/fetchers'

const UsersContent = ({ data, modals }) => {
  const { users } = data

  return (
    <div>
      {users.map((user) => {
        // const count = sets.filter((set) =>
        //   set.typesId.includes(settype._id)
        // ).length
        return (
          <UserCard
            key={user._id}
            user={user}
            onClick={() => modals.openUserModal(user)}
          />
        )
      })}
    </div>
  )
}

export default UsersContent
