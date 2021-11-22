import { UserCard } from '@admincomponents/cards'
import Content from './Content'

const UsersContent = ({ data, modals, loggedUser }) => {
  const accessToContent = loggedUser.access.users

  return (
    <Content
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
      onFabClick={accessToContent.add ? () => modals.openUserModal() : null}
      messageIfNoData="Пользователей нет"
    />
  )
}

export default UsersContent
