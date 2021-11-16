import React from 'react'
import { UserCard } from '@admincomponents/cards'
import { Virtuoso } from 'react-virtuoso'

const UsersContent = ({ data, modals, loggedUser }) => {
  if (!(data && data.length > 0))
    return <div className="px-3">'Пользователей нет'</div>

  const accessToContent = loggedUser.access.users

  return (
    <Virtuoso
      data={data}
      itemContent={(index, user) => (
        <UserCard
          loggedUser={loggedUser}
          key={user._id}
          user={user}
          onClick={() => modals.openUserModal(user)}
          onEdit={
            accessToContent.edit(user)
              ? () => modals.openUserModal(user, null, null, true)
              : null
          }
          onDelete={
            accessToContent.delete(user)
              ? () => modals.openDeleteUser(user)
              : null
          }
        />
      )}
    />
  )
}

export default UsersContent
