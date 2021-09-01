import React from 'react'
import { UserCard } from '@admincomponents/cards'
import { useSelector } from 'react-redux'

const UsersContent = ({ modals, user }) => {
  const { users } = useSelector((state) => state)
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
            onEdit={() => modals.openUserModal(showedUser, true)}
            onDelete={() => modals.openDeleteUser(showedUser)}
          />
        )
      })}
    </div>
  )
}

export default UsersContent
