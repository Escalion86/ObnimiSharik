import { DistrictForm } from '@admincomponents/forms'
import Modal from '@admin/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const DistrictModal = ({
  loggedUser,
  district,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
  modals,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.districts.read(district))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного района"
        onClose={onClose}
      />
    )

  const canEdit = district?._id && loggedUser.access?.districts.edit(district)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        district?._id &&
        loggedUser.access?.districts.delete(district) &&
        onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        district?._id && loggedUser.role === 'dev'
          ? 'ID: ' + district?._id
          : null
      }
      modals={modals}
    >
      <DistrictForm
        district={district}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default DistrictModal
