import { SetForm } from '@admincomponents/forms'
import Modal from '@adminblocks/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const SetModal = ({
  loggedUser,
  set,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
  modals,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.sets.read(set))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного набора"
        onClose={onClose}
      />
    )

  const canEdit = set?._id && loggedUser.access?.sets.edit(set)
  return (
    <Modal
      onClose={onClose}
      onDelete={set?._id && loggedUser.access?.sets.delete(set) && onDelete}
      twoCols
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        set?._id && loggedUser.role === 'dev' ? 'ID: ' + set?._id : null
      }
      modals={modals}
    >
      <SetForm
        set={set}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default SetModal
