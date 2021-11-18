import { DevToDoForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const DevToDoModal = ({
  loggedUser,
  devToDo,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.devToDo.read(devToDo))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного обращения"
        onClose={onClose}
      />
    )

  const canEdit = devToDo?._id && loggedUser.access?.devToDo.edit(devToDo)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        devToDo?._id && loggedUser.access?.devToDo.delete(devToDo) && onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
    >
      <DevToDoForm
        devToDo={devToDo}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default DevToDoModal
