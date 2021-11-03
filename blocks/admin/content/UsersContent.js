import React from 'react'
import { UserCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const UsersContent = ({ data, modals, loggedUser }) => {
  console.log(`data`, data)
  console.log(`modals`, modals)
  console.log(`loggedUser`, loggedUser)
  try {
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
        itemContent={(index, showedUser) => {
          if (index > 2) return <div>-</div>
          return (
            <UserCard
              loggedUser={loggedUser}
              key={showedUser._id}
              user={showedUser}
              onClick={() => modals.openUserModal(showedUser)}
              onEdit={() => modals.openUserModal(showedUser, null, null, true)}
              onDelete={() => modals.openDeleteUser(showedUser)}
            />
          )
        }}
      />
    )
  } catch (e) {
    console.log(`error`, e)
  }
}

export default UsersContent
