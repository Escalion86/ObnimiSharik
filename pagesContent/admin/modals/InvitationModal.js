import { InvitationForm } from '@admincomponents/forms'
import Modal from '@admin/modals/Modal'
import { MessageModal } from '.'
import { useState } from 'react'

const InvitationModal = ({
  loggedUser,
  invitation,
  onClose = () => {},
  afterConfirm = () => {},
  onDelete = null,
  edit = false,
  modals,
}) => {
  const [editMode, setEditMode] = useState(edit)
  if (!loggedUser.access?.invitations.read(invitation))
    return (
      <MessageModal
        message="У Вас нет прав на просмотр данного приглашения"
        onClose={onClose}
      />
    )

  const canEdit =
    invitation?._id && loggedUser.access?.invitations.edit(invitation)

  return (
    <Modal
      onClose={onClose}
      onDelete={
        invitation?._id &&
        loggedUser.access?.invitations.delete(invitation) &&
        onDelete
      }
      editMode={canEdit ? editMode : null}
      setEditMode={canEdit ? setEditMode : null}
      subModalText={
        invitation?._id && loggedUser.role === 'dev'
          ? 'ID: ' + invitation?._id
          : null
      }
      modals={modals}
    >
      <InvitationForm
        invitation={invitation}
        afterConfirm={afterConfirm}
        loggedUser={loggedUser}
        editMode={canEdit ? editMode : null}
      />
    </Modal>
  )
}

export default InvitationModal
