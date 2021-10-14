import React from 'react'
import { UserCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const UsersContent = ({ data, modals, loggedUser }) => {
  const users = data
  let showedUsers = []
  if (users)
    if (loggedUser.role !== 'dev')
      showedUsers = users.filter((showedUser) => showedUser.role !== 'dev')
    else showedUsers = users

  if (!(showedUsers && showedUsers.length > 0))
    return <div className="px-3">'Пользователей нет'</div>

  return (
    <Virtuoso
      data={showedUsers}
      itemContent={(index, showedUser) => (
        <UserCard
          loggedUser={loggedUser}
          key={showedUser._id}
          user={showedUser}
          onClick={() => modals.openUserModal(showedUser)}
          onEdit={() => modals.openUserModal(showedUser, true)}
          onDelete={() => modals.openDeleteUser(showedUser)}
        />
      )}
    />
  )
}

export default UsersContent
