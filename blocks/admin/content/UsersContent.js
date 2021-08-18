import React from 'react'
import { UserCard } from '@admincomponents/cards'

const UsersContent = ({ data, modals, user }) => {
  const { users } = data
  let showedUsers = []
  if (users)
    if (user.role !== 'dev')
      showedUsers = users.filter((showedUser) => showedUser.role !== 'dev')
    else showedUsers = users

  if (!(showedUsers && showedUsers.length > 0)) return <>'Пользователей нет'</>

  return (
    <div>
      {showedUsers.map((showedUser) => {
        // const count = sets.filter((set) =>
        //   set.typesId.includes(settype._id)
        // ).length
        return (
          <UserCard
            key={showedUser._id}
            user={showedUser}
            onClick={() => modals.openUserModal(showedUser)}
          />
        )
      })}
    </div>
  )
}

export default UsersContent
