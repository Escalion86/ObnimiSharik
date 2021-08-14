import React from 'react'
import { UserCard } from '@admincomponents/cards'

const UsersContent = ({ data, modals }) => {
  const { users } = data
  let showedUsers = []
  if (users) showedUsers = users.filter((user) => user.role !== 'dev')

  if (!(showedUsers && showedUsers.length > 0)) return <>'Пользователей нет'</>

  return (
    <div>
      {showedUsers.map((user) => {
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
