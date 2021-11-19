import { UserForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { useState } from 'react'
import { MessageModal } from '.'

const UserModal = ({
  loggedUser,
  user,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete,
  edit = false,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.users.read(user))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного сотрудника"
        onClose={onClose}
      />
    )

  const canEdit = user?._id && loggedUser.access?.users.edit(user)

  return (
    <Modal
      onClose={onClose}
      onDelete={user?._id && loggedUser.access?.users.delete(user) && onDelete}
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        user?._id && loggedUser.role === 'dev' ? 'ID: ' + user?._id : null
      }
    >
      <UserForm
        user={user}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default UserModal
