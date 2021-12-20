import { UserCard } from '@admincomponents/cards'
import Content from './Content'

const UsersContent = ({
  data,
  modals,
  loggedUser,
  multiselectMode = false,
  selectedItems = [],
  setSelectedItems = null,
}) => {
  const accessToContent = loggedUser.access.users

  return (
    <Content
      data={data}
      itemContent={(index, user) => {
        const checked = selectedItems.find((item) => item._id === user._id)
        return (
          <UserCard
            loggedUser={loggedUser}
            key={user._id}
            user={user}
            multiselectMode={multiselectMode}
            checked={checked}
            onCheckClick={
              setSelectedItems
                ? () =>
                    setSelectedItems(
                      checked
                        ? selectedItems.filter((item) => item._id !== user._id)
                        : [
                            ...selectedItems.filter(
                              (item) => item._id !== user._id
                            ),
                            user,
                          ]
                    )
                : null
            }
            onClick={() => modals.users.open(user)}
            onEdit={
              accessToContent.edit(user)
                ? () => modals.users.open(user, null, null, true)
                : null
            }
            onDelete={
              accessToContent.delete(user)
                ? () => modals.users.delete(user)
                : null
            }
          />
        )
      }}
      onFabClick={accessToContent.add ? () => modals.users.open() : null}
      messageIfNoData="Пользователей нет"
    />
  )
}

export default UsersContent
