import { SetTypeForm } from '@admincomponents/forms'
import Modal from '@admin/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const SetTypeModal = ({
  loggedUser,
  setType,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
  modals,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.setTypes.read(setType))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного типа набора"
        onClose={onClose}
      />
    )

  const canEdit = setType?._id && loggedUser.access?.setTypes.edit(setType)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        setType?._id && loggedUser.access?.setTypes.delete(setType) && onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        setType?._id && loggedUser.role === 'dev' ? 'ID: ' + setType?._id : null
      }
      modals={modals}
    >
      <SetTypeForm
        setType={setType}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default SetTypeModal
